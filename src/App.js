import { useState } from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Invite from "./pages/Invite";
import WorkspaceSettings from "./pages/WorkspaceSettings";
import Workspace from "./components/Workspace";
import WorkspacePage from "./pages/WorkspacePage";
import BoardPage from "./pages/BoardPage";
import CardLinkPage from "./pages/CardLinkPage";
import { AuthContextProvider } from "./middleware/AuthContext";
import ProtectedRoute from "./middleware/ProtectedRoute";
import { NotifContext } from "./notification/NotifContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReminderContext } from "./notification/DueDateReminderContext";
import BoardSettings from "./pages/BoardSettings";
import InviteBoard from "./pages/InviteBoard";
import BoardCalendar from "./pages/BoardCalendar";
import Shortcut from "./components/Shortcut";

const NavLayout = () => {
  return (
    <>
      <div className="absolute w-screen w-max-screen">
        <Navbar />
      </div>
      <Outlet />
    </>
  );
};

const Protected = () => {
  return (
    <Shortcut>
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </Shortcut>
  );
};

function App() {
  const params = useParams();

  return (
    <AuthContextProvider>
      <NotifContext>
        <ReminderContext>
          <div className="w-screen">
            <ToastContainer className="" />

            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/register" element={<Register />} />

              <Route element={<Protected />}>
                <Route element={<NavLayout />}>
                  <Route path="workspace/:id" element={<WorkspacePage />} />
                  <Route
                    path="workspace/:id/settings"
                    element={<WorkspaceSettings />}
                  />
                  <Route path="card/:id/" element={<CardLinkPage />} />
                  <Route path="board/:id/" element={<BoardPage />} />
                  <Route
                    path="board/:id/settings"
                    element={<BoardSettings />}
                  />
                  <Route
                    path="board/:id/calendar"
                    element={<BoardCalendar />}
                  />
                  <Route path="settings" element={<Settings />} />
                  <Route path="home" element={<Home />} />
                </Route>

                <Route
                  exact
                  path="/invite-workspace/:id"
                  element={
                    <div className="w-screen h-screen flex justify-center items-center">
                      <Invite />
                    </div>
                  }
                />

                <Route
                  exact
                  path="/invite-board/:id"
                  element={
                    <div className="w-screen h-screen flex justify-center items-center">
                      <InviteBoard />
                    </div>
                  }
                />
              </Route>
            </Routes>
          </div>
        </ReminderContext>
      </NotifContext>
    </AuthContextProvider>
  );
}

export default App;
