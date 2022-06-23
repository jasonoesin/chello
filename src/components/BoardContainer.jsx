import AddBoard from "./AddBoard";
import Board from "./Board";

const BoardContainer = (props) => {
  return (
    <div className="flex flex-wrap ">
      <Board />

      {props.isMember ? <AddBoard /> : null}
    </div>
  );
};

export default BoardContainer;
