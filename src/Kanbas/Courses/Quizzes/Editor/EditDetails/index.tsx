import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import EditQuestions from "../EditQuestions";
import { useParams } from "react-router-dom";

export default function EditDetails() {
  const { courseId, quizId } = useParams();

  return (
    <div>
      <h1>Edit Details</h1>
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
      </div>
    </div>
  );
}
