import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { courses } from "../Database";
import * as courseClient from "../Courses/client";

function Dashboard() {
  // how can i specify type of courses
  const [courses, setCourses] = useState<any[]>([]);
  // const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({
    name: "",
    number: "",
    startDate: "",
    endDate: "",
    department: "",
    credits: "",
    description: "",
  }); // courses.find((c) => c._id === courseId);
  const fetchAllCourses = async () => {
    const courses = await courseClient.fetchCourses();
    setCourses(courses);
  };
  const deleteCourse = async (courseId: string) => {
    const courses = await courseClient.deleteCourse(courseId);
    setCourses(courses);
  };
  const addCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };
  useEffect(() => {
    fetchAllCourses();
  }, []);
  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <h5>Course</h5>
      <input
        value={course.name}
        className="form-control"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <input
        value={course.number}
        className="form-control"
        onChange={(e) => setCourse({ ...course, number: e.target.value })}
      />
      <input
        value={course.startDate}
        className="form-control"
        type="date"
        onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
      />
      <input
        value={course.endDate}
        className="form-control"
        type="date"
        onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
      />
      <button className="btn btn-success" onClick={addCourse}>
        Add
      </button>
      {/* <button className="btn btn-primary" onClick={updateCourse}>
        Update
      </button> */}
      <hr />
      <h2>Published Courses (3)</h2> <hr />
      <div className="row">
        {/* <div>{JSON.stringify(courses)}</div> */}
        {Array.isArray(courses) && (
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {courses.map((course: any) => (
              <div key={course._id} className="col" style={{ width: 300 }}>
                <div className="card">
                  <img
                    src={`/images/code.jpg`}
                    className="card-img-top"
                    style={{ height: 150 }}
                  />
                  <div className="card-body">
                    <Link
                      className="card-title"
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      style={{
                        textDecoration: "none",
                        color: "navy",
                        fontWeight: "bold",
                      }}
                    >
                      {course.name}{" "}
                      <button
                        className="btn btn-info"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}
                      >
                        Delete
                      </button>
                    </Link>
                    <p className="card-text">{course.name}</p>
                    <Link
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      className="btn btn-primary"
                    >
                      Go{" "}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Dashboard;
