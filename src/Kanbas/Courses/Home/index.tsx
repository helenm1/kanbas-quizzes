import ModuleList from "../Modules/List";
import Status from "./Status/Status";

function Home() {
  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-md-9">
          <ModuleList />
        </div>
        <div className="col-md-3">
          <Status />
        </div>
      </div>
    </div>
  );
}

export default Home;
