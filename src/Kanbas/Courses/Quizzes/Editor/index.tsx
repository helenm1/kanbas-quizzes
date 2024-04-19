import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router";
import EditDetails from "./EditDetails";
import EditQuestions from "./EditQuestions";

export default function Editor() {
  const params = useParams();
  const { courseId, quizId } = params;
  console.log("courseId", courseId);
  console.log("quizId", quizId);

  return (
    <div>
      <h1>Quiz Editor</h1>
      <nav className="nav nav-tabs mt-2">
        <Link className="nav-link" to="editdetails">
          Details
        </Link>
        <Link className="nav-link" to="editquestions">
          Questions
        </Link>
        <Routes>
          <Route path="EditDetails" element={<EditDetails />} />
          <Route path="EditQuestions" element={<EditQuestions />} />
        </Routes>
      </nav>
    </div>
  );
}
