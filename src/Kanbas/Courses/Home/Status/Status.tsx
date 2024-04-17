import {
  FaArrowAltCircleRight,
  FaBell,
  FaBullhorn,
  FaBullseye,
  FaChartBar,
  FaCheckCircle,
  FaExclamationCircle,
  FaFileExport,
  FaStopCircle,
} from "react-icons/fa";
import "./index.css";
function Status() {
  return (
    <>
      <h4>Course Status</h4>
      <hr />
      <table>
        <tbody>
          <tr>
            <td>
              <button className="btn btn-light mb-2">
                <FaStopCircle className="me-2" />
                Unpublish
              </button>
            </td>
            <td>
              <button className="btn btn-success mb-2">
                <FaCheckCircle className="me-2" />
                Published
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-light mb-1">
        <FaFileExport className="me-2" />
        Import Existing Content
      </button>
      <br />
      <button className="btn btn-light mb-1">
        <FaArrowAltCircleRight className="me-2" />
        Import From Commons
      </button>
      <br />
      <button className="btn btn-light mb-1">
        <FaBullseye className="me-2" />
        Choose Home Page
      </button>
      <br />
      <button className="btn btn-light mb-1">
        <FaChartBar className="me-2" />
        View Course Stream
      </button>
      <br />
      <button className="btn btn-light mb-1">
        <FaBullhorn className="me-2" />
        New Announcement
      </button>
      <br />
      <button className="btn btn-light mb-1">
        <FaChartBar className="me-2" />
        New Analytics
      </button>
      <br />
      <button className="btn btn-light mb-1">
        <FaBell className="me-2" />
        View Course Notifications
      </button>
      <br />

      <h6 className="mt-2">To Do</h6>
      <hr />
      <span className="to-do">
        <a href="#" className="status-links">
          <FaExclamationCircle className="me-2" />
          Grade A1 - ENV + HTML<i className="ms-5">X</i>
        </a>
      </span>
      <br />
      <p className="text-muted ms-4">100 points - Sep 18 at 11:59pm</p>

      <br />

      <h6 className="mt-2">Coming Up</h6>

      <h6 className="mt-2">
        <span className="to-do">
          <a href="#" className="status-links">
            <i className="fa fa-calendar me-2"></i>View Calendar
          </a>
        </span>
      </h6>

      <hr />
      <span className="to-do">
        <a href="" className="status-links">
          <i className="fa fa-calendar me-2"></i>Lecture
        </a>
      </span>
      <br />
      <p className="text-muted ms-4 mb-0">CS4550.12631.202410</p>
      <p className="text-muted ms-4">Sep 11 at 11:45am</p>

      <span className="to-do">
        <a href="" className="status-links">
          <i className="fa fa-calendar me-2"></i>CS5610 06 SP23 Lecture
        </a>
      </span>
      <br />
      <p className="text-muted ms-4 mb-0">CS4550.12631.202410</p>
      <p className="text-muted ms-4">Sep 11 at 6pm</p>

      <span className="to-do">
        <a href="" className="status-links">
          <i className="fa fa-calendar me-2"></i>CS5610 Web Development Summer 1
          2023 - Lecture
        </a>
      </span>
      <br />
      <p className="text-muted ms-4 mb-0">CS4550.12631.202410</p>
      <p className="text-muted ms-4">Sep 11 at 11:45am</p>
    </>
  );
}
export default Status;
