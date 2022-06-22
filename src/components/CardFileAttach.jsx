import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase-config";
import { useEffect } from "react";
import { useRef } from "react";

const CardFileAttach = (props) => {
  const [fileUpload, setfileUpload] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [fileNameList, setFileNameList] = useState([]);
  const [needRefresh, setRefresh] = useState(false);

  const uploadImage = () => {
    if (fileUpload == null) return;
    const imageRef = ref(
      storage,
      `card-attachments/${props.card}/${fileUpload.name}`
    );
    uploadBytes(imageRef, fileUpload).then(() => {
      alert("File Uploaded");
      setRefresh(!needRefresh);
    });
  };

  const fileRef = ref(storage, `card-attachments/${props.card}/`);

  useEffect(() => {
    listAll(fileRef).then((resp) => {
      setFileNameList(resp.items.map((item) => item.name));

      resp.items.map((item) => {
        getDownloadURL(item).then((url) => {
          setFileList((prev) => [...prev, url]);
        });
      });
    });
  }, [fileUpload, needRefresh]);

  return (
    <div className="relative">
      <p className="p-2 font-medium">Card Attachments</p>

      {
        <div className="flex flex-col">
          {fileNameList.map((file, index) => {
            return (
              <div className="flex" key={file}>
                <div className="flex p-2 mt-1 w-52">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 stroke-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  <a href={fileList[index]} className="ml-2">
                    {file}
                  </a>
                </div>
                <button
                  onClick={() => {
                    const deleteRef = ref(
                      storage,
                      `card-attachments/${props.card}/${file}`
                    );

                    deleteObject(deleteRef).then(() => {
                      setRefresh(!needRefresh);
                    });
                  }}
                  className="underline mt-2 w-1/3 text-gray-600 hover:text-gray-800 text-xs ml-5 rounded-xl"
                >
                  Detach File
                </button>
              </div>
            );
          })}
        </div>
      }

      <div className="ml-3 mt-4 flex flex-col mb-4">
        <input
          onChange={(e) => {
            setfileUpload(e.target.files[0]);
          }}
          type="file"
        />
        <button
          onClick={uploadImage}
          className="mt-2 px-4 py-1 w-1/4 bg-gray-100 hover:bg-gray-200 rounded border"
        >
          Submit
        </button>
      </div>

      {/* <form className="p-2 absolute top-12 right-0 rounded text-xs ">
        <button className="text-gray-400 hover:text-gray-500 underline">
          Attach Link Instead
        </button>
        <div className="p-3 bg-white border-gray-50 border rounded drop-shadow-xl h-fit  w-64  flex flex-col">
          Attach Link
          <input
            className="mt-1 border-gray-200 border-2 px-3 py-2 rounded"
            type="text"
            placeholder="Testing"
          />
          <button className="mt-2 px-4 py-1 w-1/3 bg-gray-100 hover:bg-gray-200 rounded border ">
            Attach
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default CardFileAttach;
