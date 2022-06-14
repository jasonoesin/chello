import { useState } from "react";
import Login from "./Login";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="">
      {/* Navbar */}

      <div className="absolute w-screen">
        <Navbar />
      </div>
      {/* Content */}
      <div className="min-h-screen bg-grey-50 flex flex-col justify-center">
        <Login />
      </div>
    </div>
  );
}

export default App;
