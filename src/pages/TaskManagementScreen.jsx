import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Model from "../components/Model";
import fetchDual from "../api/apiPassinGateway";

const TaskManagementScreen = () => {
  // state variable
  const [task, setTask] = useState("");
  const [open, setOpen] = useState(false);
  const [fetchedTask, updateFetchedTask] = useState([]);
  const [reGetask, setGetask] = useState(false);

  const [edit, setEdit] = useState(false);
  const [current_document, setCurrentdocument] = useState({});
  const [renderEdit, setRenderEdit] = useState(false);

  const navigate = useNavigate();

  const openModal = () => setOpen(true);

  const closeModal = () => setOpen(false);

  // get task title from field
  const getTaskTitle = (e) => {
    console.log(e.target.value);
    setTask(e.target.value);
  };

  // send task to db ==> send id + task
  const saveTask = async () => {
    try {
      const requestForwarded = await fetchDual("/api/saveTask/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskTitle: task }),
      });
      const response = await requestForwarded.json();
      console.log(response);
      alert(response.message);
      if (requestForwarded.ok) setGetask((prev) => !prev);
    } catch (error) {
      console.log("error while submiting task ", error);
    }
  };

  // delete a task
  const deleteTask = async (task) => {
    const deleteTask = await fetchDual(`/api/deleteTask/${task._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await deleteTask.json();
    alert(data.res);
    setGetask((prev) => !prev);
  };

  // edit a task
  const ediTask = (currentDocument) => {
    console.log(`running ${currentDocument.taskTitle}`);
    console.log("current document data", currentDocument);

    setEdit(true);
    setCurrentdocument(currentDocument);
  };

  // update checkbox status
  const updateStatus = async (e, collectionId) => {
    console.log(e.target.checked);

    console.log(collectionId);

    const updateCheckbox = await fetchDual(
      `/api/updateCheckbox/${collectionId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newStatusVal: e.target.checked }),
      }
    );
    console.log(updateCheckbox);
    if (updateCheckbox.ok) setGetask((prev) => !prev);
  };

  // logout a user
  const logoutMethod = async () => {
    const logout_Req = await fetchDual("/api/logout/");
    const success = await logout_Req.json();
    alert(success.message);
    navigate("/");
  };

  // auto fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const reqTask = await fetchDual("/api/fetchTask/");
      const response = await reqTask.json();
      console.log(response);

      updateFetchedTask(response);
    };

    fetchTasks();
  }, [reGetask, renderEdit]);

  return (
    <>
      <div className="bg-[#282828] flex justify-around align-baseline py-4">
        <h2 className="text-4xl font-bold">Task Management Screen</h2>

        <div>
          <button
            type="button"
            onClick={openModal}
            className="text-[#2f220f] bg-[#f4af50] p-2 text-md leading-5 font-bold hover:cursor-pointer mr-2 min-w-2.5"
          >
            {" "}
            +Add Task
          </button>
          <button
            type="button"
            className="text-[#2f220f] bg-[#f4af50] p-2 text-md leading-5 font-bold
min-w-2.5 hover:cursor-pointer"
            onClick={logoutMethod}
          >
            logout
          </button>
        </div>
      </div>

      {/* list */}
      <div className="bg-[#282828] w-3/4 h-[500px] overflow-scroll rounded-b-lg mx-auto py-4 px-5">
        {fetchedTask ? (
          fetchedTask.map((task) => {
            return (
              <div
                className="flex mx-6 justify-between mb-1 border-b-2 pb-1"
                key={task._id}
              >
                <div className="flex gap-4">
                  <input
                    type="checkbox"
                    checked={task.status}
                    onChange={(e) => {
                      updateStatus(e, task._id);
                    }}
                    className="w-[20px] mt-2"
                  />
                  <p className="text-2xl">{task.taskTitle}</p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => {
                      ediTask(task);
                    }}
                    className="border-b mr-2 hover:cursor-pointer"
                  >
                    edit
                  </button>
                  <button
                    type="button"
                    className="border-b cursor-pointer"
                    onClick={() => {
                      deleteTask(task);
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-xl">No task created yet.</p>
        )}
      </div>

      {/* `````````````  pop-UP   `````````````````` */}
      {/* Modal Overlay */}
      {open && (
        <div className="fixed text-black inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-50">
          {/* Modal Box */}
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md transform scale-100 transition-transform duration-300">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2">
              <h3 className="text-lg font-semibold">Add Task</h3>
              <button
                onClick={closeModal}
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
                onChange={getTaskTitle}
                className="bg-gray-800 text-white px-0.5 py-1 font-bold mr-2"
              />
              <button
                type="button"
                className="hover:cursor-pointer"
                onClick={() => {
                  saveTask();
                  closeModal();
                }}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit model */}
      {edit ? (
        <Model
          setEditMethod={setEdit}
          current={current_document}
          setRenderEditMethod={setRenderEdit}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default TaskManagementScreen;
