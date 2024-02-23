import React from "react";
import {
  FaCaretDown,
  FaCheckCircle,
  FaEllipsisV,
  FaFileAlt,
  FaPlus,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import "./index.css";
function Assignments() {
  const { courseId } = useParams();
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId
  );
  return (
    <div className="mt-4">
      <div className="d-flex justify-content-end mt-2">
        <form className="me-5">
          <input
            className="form-control"
            type="text"
            id="assign"
            name="searchAssign"
            placeholder="Search for Assignment"
          ></input>
        </form>
        <button className="btn btn-light me-2">+ Group</button>
        <button className="btn btn-danger">+ Assignment</button>
        <button className="btn btn-light">
          <FaEllipsisV />
        </button>
      </div>
      <hr />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> <FaCaretDown className="me-2" />
            ASSIGNMENTS
            <span className="float-end">
              <span className="assignment-weight me-2">40% of Total</span>
              <FaCheckCircle className="text-success" />
              <FaPlus className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item">
                <FaEllipsisV className="me-2" />
                <FaFileAlt className="me-2 text-success" />
                <Link
                  className="assignmentLinks mb-2"
                  to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                >
                  {assignment.title}
                </Link>
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaEllipsisV className="ms-2" />
                </span>
                <div className="ms-5 mb-2">
                  <span className="modules-text me-2">Multiple Modules</span>
                  <span>| Due Sep 18 at 11:59pm | 100 pts</span>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
export default Assignments;
