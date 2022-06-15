import AddWorkSpace from "../components/AddWorkSpace";
import Sidebar from "../components/Sidebar";
import Workspace from "../components/Workspace";

const Home = () => {
  return (
    <div className="">
      <div className="mt-24 w-screen h-fit">
        <div className="wrap px-16">
          <Sidebar />
          <Workspace />
        </div>
      </div>
    </div>
  );
};

export default Home;
