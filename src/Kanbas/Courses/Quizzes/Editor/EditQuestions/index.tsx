import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import EditDetails from "../EditDetails";
import { useParams } from "react-router-dom";

export default function EditQuestions() {
  const { courseId, quizId } = useParams();

  return (
    <div>
      <h1>Edit Questions</h1>
      <div>
        <nav className="nav nav-tabs mt-2">
          <Link
            className="nav-link"
            to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/editor/editdetails`}
          >
            Details
          </Link>
          <Link
            className="nav-link"
            to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/editor/editquestions`}
          >
            Questions
          </Link>
          <Routes>
            <Route path="EditDetails" element={<EditDetails />} />
            <Route path="EditQuestions" element={<EditQuestions />} />
          </Routes>
        </nav>
      </div>{" "}
    </div>
  );
}
