import AddList from "./AddList";
import CardDetail from "./CardDetail";
import ListComponent from "./ListComponent";

const ListContainer = (props) => {
  return (
    <div className="flex flex-wrap ">
      <ListComponent isMember={props.isMember} />

      {props.isMember ? <AddList /> : null}
    </div>
  );
};

export default ListContainer;
