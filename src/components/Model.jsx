import { useState } from "react";
import fetchDual from "../api/apiPassinGateway";

const Model = ({ setEditMethod, current, setRenderEditMethod}) => {
  const [vaLatest, setValatest] = useState("");

  // close Edit model
  const closeEditModel = () => {
    setEditMethod(false);
  };

  // get title new to update task title
  const getEditTaskTitle = (e) => {
    setValatest(e.target.value);
  };

  // sending updated title
  const saveEditTask = async () => {
    try {
      const editRequest = await fetchDual(`/api/editReq/${current._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTaskVal: vaLatest }),
      });
      
       console.log(editRequest);
       setRenderEditMethod(true);
    } catch(error) {
      console.log("error while submitting edit request", error);
    }
  };

  return (
    <>
      <div className="fixed text-black inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-50">
        {/* Modal Box */}
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md transform scale-100 transition-transform duration-300">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2">
            <h3 className="text-lg font-semibold">Edit Task</h3>
            <button
              onClick={closeEditModel}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            <input
              type="text"
              defaultValue={current.taskTitle}
              onChange={getEditTaskTitle}
              className="bg-gray-800 text-white px-0.5 py-1 font-bold mr-2"
            />
            <button
              type="button"
              className="hover:cursor-pointer"
              onClick={() => {
                saveEditTask();
                closeEditModel();
              }}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
