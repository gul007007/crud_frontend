// const fetchDual = async (url, options = {}) => {
//   // Initial Req
//   const request = await fetch(url, {
//     ...options,
//     credentials: options.credentials || "include",
//     headers: {
//       ...options.headers,
//     },
//   });

//   if (request.status === 401) {
//     const refreshResponse = await fetch("/api/newAccessTokenGeneration/token", {
//       method: "POST",
//       credentials: "include",
//     });

//     if (refreshResponse.ok) {
//       return fetchDual(url, options);
//     } else {
//       await fetch("/api/logout/", {
//         credentials: "include",
//       });

//       window.location.href = "/login";
//       return;
//     }
//   }

//   // Invalid token - logout
//   if (request.status === 403) {
//     await fetch('api/logout/', { 
//       credentials: 'include' 
//     });
//     window.location.href = '/login';
//     return;
//   }

//   return request;
// };
// export default fetchDual;


const fetchDual = async (url, options = {}) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://crud-token.vercel.app"; // Use env variable or fallback
  const fullUrl = url.startsWith("/") ? `${API_BASE_URL}${url}` : `${API_BASE_URL}/${url}`; // Normalize URL

  // Initial Request
  const request = await fetch(fullUrl, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
    },
  });

  if (request.status === 401) {
    const refreshResponse = await fetch(`${API_BASE_URL}/api/newAccessTokenGeneration/token`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.ok) {
      return fetchDual(url, options);
    } else {
      await fetch(`${API_BASE_URL}/api/logout`, { // Remove trailing slash
        credentials: "include",
      });
      window.location.href = "/login";
      return;
    }
  }

  if (request.status === 403) {
    await fetch(`${API_BASE_URL}/api/logout`, { // Remove trailing slash
      credentials: "include",
    });
    window.location.href = "/login";
    return;
  }

  return request;
};
export default fetchDual;