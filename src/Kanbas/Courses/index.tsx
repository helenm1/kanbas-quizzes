import { courses } from "../../Kanbas/Database";
import * as courseClient from "./client";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaChevronRight } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Quizzes from "./Quizzes";
import Home from "./Home";
import Assignments from "./Assignments";
import axios from "axios";
import { useEffect, useState } from "react";
import QuizDetails from "./Quizzes/QuizDetails";
import Editor from "./Quizzes/Editor";
import EditDetails from "./Quizzes/Editor/EditDetails";
// import EditQuestions from "./Quizzes/Editor/EditQuestions";
import Preview from "./Quizzes/Preview";
import QuestionsTab from "./Quizzes/Editor/Editor/QuestionsTab";

function Courses() {
  const { courseId } = useParams();
  // const COURSES_API = "http://localhost:4000/api/courses";
  const [course, setCourse] = useState({ name: "" });
  const fetchCourse = async () => {
    const course = await courseClient.fetchCourseById(courseId);
    setCourse(course);
  };
  // const findCourseById = async (courseId?: string) => {
  //   const response = await axios.get(`${COURSES_API}/${courseId}`);
  //   setCourse(response.data);
  // };
  useEffect(() => {
    fetchCourse();
  }, [courseId]);
  const { pathname } = useLocation();
  const courseSection = pathname.split("/").slice(-1)[0];
  return (
    <div>
      <h5 style={{ color: "red", paddingLeft: "17px" }}>
        <HiMiniBars3 /> Course {course?.name} <FaChevronRight /> {courseSection}{" "}
      </h5>
      <hr />
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "300px", top: "50px" }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<h1>Assignment Editor</h1>}
            />
            <Route path="Grades" element={<h1>Grades</h1>} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:quizId" element={<QuizDetails />} />
            <Route
              path="Quizzes/:quizId/Editor"
              element={<EditDetails />}
            ></Route>
            <Route
              path="Quizzes/:quizId/Editor/EditDetails"
              element={<EditDetails />}
            ></Route>
            <Route
              path="Quizzes/:quizId/Editor/EditQuestions/*"
              element={<QuestionsTab />}
            ></Route>
            <Route path="Quizzes/:quizId/Preview" element={<Preview />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Courses;
