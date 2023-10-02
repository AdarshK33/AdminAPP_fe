import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard/Dashboard";
import AddClient from "./pages/Client/Add/AddClient";
import Layout from "./components/Layout/Layout";
import ListClients from "./pages/Client/List/ListClients";
import { Provider } from "react-redux";
import store from "./redux/store";
import AddProject from "./pages/Project/Add/AddProject";
import "react-datepicker/dist/react-datepicker.css";
import ListProject from "./pages/Project/List/ListProject";
import Login from "./pages/Login/Login";
import AddUser from "./pages/User/Add/AddUser";
import ListUser from "./pages/User/List/ListUser";
import Deadline from "./pages/Deadline/Deadline";
import Inbox from "./pages/Email/Inbox";
import Compose from "./pages/Email/Compose";
import ViewDetails from "./pages/ViewDetails/ViewDetails";

import PendingReports from "./pages/Reports/Pending/PendingReports";
import CompletedReports from "./pages/Reports/Completed/CompletedReports";
import ProfileDetails from "./pages/Profile/ProfileDetails";
import ProjectConsole from "./pages/Project/Console/ProjectConsole";
import TaskConsole from "./pages/Task/Console/TaskConsole";
import DownloadReports from "./pages/Reports/Download/DownloadReports";
import AddTask from "./pages/Task/Add/AddTask";
import ListTask from "./pages/Task/List/ListTask";
import ResetPassword from "./pages/Reset/ResetPassword";
import ConfirmPass from "./pages/ConfirmPass/ConfirmPass";
import ConfigPage from "./pages/ConfigPage/ConfigPage";
function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/newpassword/:email/:token" element={<ConfirmPass />} />
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/*" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-client" element={<AddClient />} />
              <Route path="/all-clients" element={<ListClients />} />
              <Route path="/project-console" element={<ProjectConsole />} />
              <Route path="/add-project" element={<AddProject />} />
              <Route path="/all-projects" element={<ListProject />} />
              <Route path="/task-console" element={<TaskConsole />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/all-users" element={<ListUser />} />
              <Route path="/calendar" element={<Deadline />} />
              {/* <Route path="/config" element={<ConfigPage />} /> */}
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/send-report" element={<Compose />} />
              <Route path="/pending-projects" element={<PendingReports />} />
              <Route path="/completed-projects" element={<CompletedReports />} />
              <Route path="/profile-details" element={<ProfileDetails />} />
              <Route path="/download-reports" element={<DownloadReports />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/all-tasks" element={<ListTask />} />
              <Route path="/view-details/:id/:name" element={<ViewDetails />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App;
