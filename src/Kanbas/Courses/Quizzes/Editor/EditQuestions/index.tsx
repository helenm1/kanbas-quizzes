import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import EditDetails from "../EditDetails";
import { useParams } from "react-router-dom";
import * as client from "../../client";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
} from "../../reducer";
import { useEffect } from "react";
import { FaBan, FaCheckCircle } from "react-icons/fa";

export default function EditQuestions() {
  // const { courseId, quizId } = useParams();
  // const quiz = client.fetchQuizById(courseId ?? "", quizId ?? "");
  // console.log("quiz", quiz);
  const { courseId } = useParams();
  const { quizId } = useParams();

  const validatedCourseId = courseId ? courseId : "";

  let quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  // console.log("quiz before fetch quiz details", quiz);
  const dispatch = useDispatch();

  const fetchQuiz = async () => {
    const quiz = await client.fetchQuizById(validatedCourseId, quizId);
    console.log("quiz in fetch quiz", quiz);
    dispatch(setQuiz(quiz));
  };

  useEffect(() => {
    fetchQuiz();
    client
      .fetchQuizById(validatedCourseId, quizId)
      .then((quizzes) => dispatch(setQuizzes(quizzes)));
  }, [validatedCourseId]);

  console.log("quiz in editQuiz", quiz);

  return (
    <div>
      <div className="d-flex justify-content-end mt-2">
        <div className="p-3">Points: {quiz.points}</div>
        <div className="p-3">
          {quiz.published && (
            <div>
              <FaCheckCircle className="text-success" />
              Published
            </div>
          )}
        </div>
        <div className="p-3">
          {!quiz.published && (
            <div>
              <FaBan className="text-danger" />
              Published
            </div>
          )}
        </div>
      </div>
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
