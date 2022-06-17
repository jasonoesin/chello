import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useParams } from "react-router-dom";

const AddList = () => {
  const ref = collection(db, "list");
  const params = useParams();

  var addNewList = () => {
    addDoc(ref, {
      title: "List Title",
      board: params.id,
    });
  };

  return (
    <>
      <div className="h-16  w-[22rem] flex justify-center">
        <button
          onClick={addNewList}
          className="p-6 w-full max-w-xs bg-gray-200 rounded-lg border border-gray-200 shadow-md hover:bg-gray-300
                flex justify-center items-center"
        >
          <div className="font-bold italic">Create a new List</div>
        </button>
      </div>
    </>
  );
};

export default AddList;
