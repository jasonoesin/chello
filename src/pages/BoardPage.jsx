import ListContainer from "../components/ListContainer";
import Sidebar from "../components/Sidebar";
import Workspace from "../components/Workspace";

const BoardPage = () => {
  return (
    <div className="">
      <div className="mt-24 w-screen h-fit">
        <div className="wrap px-16">
          <div className="!SIDEBAR fixed">
            <Sidebar />
            <div className="mt-4">
              <Workspace />
            </div>
          </div>
          <div className="pl-64">
            <ListContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
