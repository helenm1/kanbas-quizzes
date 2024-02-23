import { Link, useLocation } from "react-router-dom";
import "./index.css";
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaBook,
  FaRegCalendarAlt,
  FaEnvelopeOpen,
  FaClock,
  FaTv,
  FaShareSquare,
  FaRegQuestionCircle,
} from "react-icons/fa";
// import nLogo from "../../images/n-logo.png";

function KanbasNavigation() {
  const links = [
    { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
    { label: "Courses", icon: <FaBook className="fs-2" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
    { label: "Inbox", icon: <FaEnvelopeOpen className="fs-2" /> },
    { label: "History", icon: <FaClock className="fs-2" /> },
    { label: "Studio", icon: <FaTv className="fs-2" /> },
    { label: "Commons", icon: <FaShareSquare className="fs-2" /> },
    { label: "Help", icon: <FaRegQuestionCircle className="fs-2" /> },
  ];
  const { pathname } = useLocation();
  return (
    <div>
      {/* <img src={nLogo} alt="nLogo" width="80" height="80"></img> */}
      <ul className="wd-kanbas-navigation">
        {links.map((link, index) => (
          <li
            key={index}
            className={pathname.includes(link.label) ? "wd-active" : ""}
          >
            <Link to={`/Kanbas/${link.label}`}>
              {" "}
              {link.icon} {link.label}{" "}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default KanbasNavigation;
