import AddList from "./AddList";
import ListComponent from "./ListComponent";

const ListContainer = () => {
  return (
    <div className="flex flex-wrap ">
      <ListComponent />
      <AddList />
    </div>
  );
};

export default ListContainer;
