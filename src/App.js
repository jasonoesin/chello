import { useState } from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import {
  BrowserRouter,
  Link,
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

const Layout = () => (
  <div className="min-h-screen bg-grey-50 flex flex-col justify-center">
    <Routes>
      <Route path="register" element={<Register />} />
      <Route exact path="/" element={<Login />} />
    </Routes>
  </div>
);

function App() {
  const params = useParams();

  return (
    <div className="absolute w-screen">
      {/* ----------------------CONTENT----------------------- */}
      <div className="absolute w-screen w-max-screen">
        <Navbar />
      </div>
      <Routes>
        <Route path="*" element={<Layout />} />

        <Route
          path="/invite-workspace/:id"
          element={
            <div className="w-screen h-screen flex justify-center items-center">
              <Invite />
            </div>
          }
        />
        <Route path="/workspace/:id" element={<WorkspacePage />} />
        <Route path="/workspace/:id/settings" element={<WorkspaceSettings />} />
        <Route path="/board/:id/" element={<BoardPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
