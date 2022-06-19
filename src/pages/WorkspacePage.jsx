import { useParams } from "react-router-dom";
import AddWorkSpace from "../components/AddWorkSpace";
import BoardContainer from "../components/BoardContainer";
import Sidebar from "../components/Sidebar";
import Workspace from "../components/Workspace";

const WorkspacePage = () => {
  const params = useParams();

  return (
    <div className="">
      <div className="mt-24 w-screen h-fit">
        <div className="wrap px-16">
          <div className="!SIDEBAR fixed">
            <Sidebar />
            <div className="mt-4">
              <Workspace open={params.id} />
            </div>
          </div>
          <div className="pl-64">
            <BoardContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
