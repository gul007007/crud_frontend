import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [data, setLoginData] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  // grab Input from fields
  const grabInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setLoginData((prev) => {
      return { ...prev, [`${name}`]: value };
    });
  };

  // collected data will be sent to db >> registerData
  const sendToDB = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const return_data = await response.json();
      console.log(return_data);
      alert(return_data.message);
      if(response.ok) navigate("/task-management-screen");
    } catch (error) {
      console.error("error while submiting login data", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login Screen
        </h2>
        <form className="space-y-6" onSubmit={sendToDB}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="loginEmail"
            >
              email
            </label>
            <input
              type="email"
              name="loginEmail"
              id="loginEmail"
              value={data.loginEmail}
              className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              onChange={grabInput}
            />
          </div>

          <div>
            <label
              htmlFor="loginPassword"
              className="block text-sm font-medium text-gray-700"
            >
              password
            </label>
            <input
              type="password"
              name="loginPassword"
              id="loginPassword"
              value={data.loginPassword}
              className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              onChange={grabInput}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
