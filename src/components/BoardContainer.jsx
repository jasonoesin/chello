import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddBoard from "./AddBoard";
import Board from "./Board";

const BoardContainer = (props) => {
  return (
    <>
      <div className="mt-1 mb-3 font-bold text-gray-900 tracking-tight text-4xl">
        {props.ws.name}
      </div>
      <div className="flex flex-wrap ">
        <Board />

        {props.isMember ? <AddBoard /> : null}
      </div>
    </>
  );
};

export default BoardContainer;
