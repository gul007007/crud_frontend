const fetchDual = async (url, options = {}) => {
  const API_BASE_URL= "https://crud-token.vercel.app/";
  // Initial Req
  const request = await fetch(`${API_BASE_URL}/${url}`, {
    ...options,
    credentials: options.credentials || "include",
    headers: {
      ...options.headers,
    },
  });

  if (request.status === 401) {
    const refreshResponse = await fetch("/api/newAccessTokenGeneration/token", {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.ok) {
      return fetchDual(url, options);
    } else {
      await fetch("/api/logout/", {
        credentials: "include",
      });

      window.location.href = "/login";
      return;
    }
  }

  // Invalid token - logout
  if (request.status === 403) {
    await fetch('api/logout/', { 
      credentials: 'include' 
    });
    window.location.href = '/login';
    return;
  }

  return request;
};
export default fetchDual;
