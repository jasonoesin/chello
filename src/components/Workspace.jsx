import { useEffect } from "react";
import { useState } from "react";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase-config";

const Workspace = () => {
  const [workspaceList, setWorkSpace] = useState([]);

  const colRef = collection(db, "workspace");

  useEffect(() => {
    // const getWorkSpaces = async () => {
    //   const data = await getDocs(colRef);
    //   setWorkSpace(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    // getWorkSpaces();
    onSnapshot(colRef, (snapshot) => {
      if (!snapshot.empty) {
        let workspaces = [];
        snapshot.docs.forEach((doc) => {
          workspaces.push({ ...doc.data(), id: doc.id });
        });
        setWorkSpace(workspaces);
      }
    });
  }, []);
  return (
    <div className="">
      {workspaceList.map((workspace) => {
        return (
          <div key={workspace.id} className="">
            {workspace.name}
          </div>
        );
      })}
    </div>
  );
};

export default Workspace;
