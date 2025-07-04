import AppNameScreen from "./pages/AppNameScreen";
import RegisterScreen from "./pages/RegisterScreen";
import LoginScreen from "./pages/LoginScreen";
import { Routes, Route } from "react-router-dom";
import TaskManagementScreen from "./pages/TaskManagementScreen";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppNameScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/task-management-screen"
          element={<TaskManagementScreen />}
        />
      </Routes>
    </>
  );
}

export default App;
