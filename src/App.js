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
      <div className="absolute w-screen w-max-screen">
        <Navbar />
      </div>
      {/* ----------------------CONTENT----------------------- */}
      <Routes>
        <Route path="*" element={<Layout />} />
        <Route
          path="/invite-workspace/:id"
          element={
            <div className="w-screen h-fit h-screen flex justify-center items-center">
              <Invite />
            </div>
          }
        />
        <Route path="settings" element={<Settings />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
