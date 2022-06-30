import { createRef } from "react";
import { useRef } from "react";
import { UserAuth } from "../middleware/AuthContext";
import AddList from "./AddList";
import CardDetail from "./CardDetail";
import ListComponent from "./ListComponent";

const ListContainer = (props) => {
  const childRef = useRef();
  const { nav } = UserAuth();

  const onChange = (e) => {
    childRef.current.searchOnChange(e);
  };

  return (
    <>
      <div className="mt-1 mb-3 font-bold text-gray-900 tracking-tight text-4xl flex items-center">
        {props.board.title}
        {props.isMember && (
          <svg
            onClick={() => {
              nav("/board/" + props.board.id + "/settings");
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="ml-4 mt-2 h-5 w-5 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <input
          onChange={onChange}
          name="email"
          className="relative left-32 w-1/3 text-sm font-normal p-2 bg-transparent border-2 border-gray-500 rounded-md"
          type="text "
          placeholder="Search for lists"
        />
      </div>
      <div className="flex flex-wrap ">
        <ListComponent
          ref={childRef}
          isMember={props.isMember}
          board={props.board}
        />
        {props.isMember ? <AddList /> : null}
      </div>
    </>
  );
};

export default ListContainer;
