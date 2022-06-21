import AddList from "./AddList";
import CardDetail from "./CardDetail";
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
