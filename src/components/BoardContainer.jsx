import AddBoard from "./AddBoard";
import Board from "./Board";

const BoardContainer = () => {
  return (
    <div className="flex flex-wrap">
      <Board />
      <Board />
      <Board />
      <Board />
      <Board />
      <AddBoard />
    </div>
  );
};

export default BoardContainer;
