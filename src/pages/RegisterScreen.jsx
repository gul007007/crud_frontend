import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchDual from "../api/apiPassinGateway";
const RegisterScreen = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // grab Input from fields
  const grabInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setRegisterData((prev) => {
      return { ...prev, [`${name}`]: value };
    });
  };

  // collected data will be sent to db >> registerData
  const sendToDB = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchDual("/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      console.log(data);
      alert(data.message);
      navigate('/login')
    } catch (error) {
      console.error("error while submiting register data", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Register Screen
        </h2>
        <form className="space-y-6" onSubmit={sendToDB}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={registerData.username}
              onChange={grabInput}
              className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              onChange={grabInput}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              onChange={grabInput}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
