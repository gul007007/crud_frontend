import { Link } from "react-router-dom";
const AppNameScreen = () => {
  return (
    <>
      <div className="h-screen">
        <div className="h-3/4 flex flex-col justify-around">
          <div className="flex justify-end gap-1.5">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
              type="button"
            >
              <Link to="/register">Register</Link>
            </button>
            <button
              type="button"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
            >
              <Link to='/login'>Login</Link>
            </button>
          </div>
          <div>
            <p className="text-6xl font-extrabold text-center text-teal-500 animate-bounce">
              Task Management
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppNameScreen;
