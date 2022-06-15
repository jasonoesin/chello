import { useState } from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

const Layout = () => (
  <div className="min-h-screen bg-grey-50 flex flex-col justify-center">
    <Routes>
      <Route path="register" element={<Register />} />
      <Route exact path="/" element={<Login />} />
    </Routes>
  </div>
);

function App() {
  return (
    <div className="absolute w-screen">
      {/* Navbar */}

      <div className="absolute w-screen">
        <Navbar />
      </div>
      {/* ----------------------CONTENT----------------------- */}
      <Routes>
        <Route path="*" element={<Layout />} />
        <Route path="settings" element={<Settings />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
