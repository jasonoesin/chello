import AddList from "./AddList";
import CardDetail from "./CardDetail";
import ListComponent from "./ListComponent";

const ListContainer = (props) => {
  return (
    <>
      <div className="mt-1 mb-3 font-bold text-gray-900 tracking-tight text-4xl">
        {props.board.title}
      </div>
      <div className="flex flex-wrap ">
        <ListComponent isMember={props.isMember} board={props.board} />
        {props.isMember ? <AddList /> : null}
      </div>
    </>
  );
};

export default ListContainer;
