import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import EditDetails from "../EditDetails";
import { useParams } from "react-router-dom";
import * as quizzesClient from "../../client";
import * as questionsClient from "./client";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
} from "../../reducer";
import { addQuestion } from "./reducer";
import { useEffect, useState } from "react";
import { FaBan, FaCheckCircle, FaSearch } from "react-icons/fa";
import QuestionList from "./QuestionList";
import { Question } from "./client";

export default function EditQuestions() {
  const { courseId } = useParams();
  const { quizId } = useParams();
  const [question, setQuestion] = useState({
    quizId: quizId,
    questionText: "New question",
    points: 1,
    type: "MULTIPLE_CHOICE",
  });

  const [questions, setQuestions] = useState<Question[]>([]);

  const addNewQuestion = async () => {
    const newQuestion = await questionsClient.createQuestion(
      courseId ?? "",
      quizId ?? "",
      question
    );
    dispatch(addQuestion(newQuestion));
    // setQuestions([...questions, newQuestion]);
  };

  // const { courseId, quizId } = useParams();
  // const quiz = client.fetchQuizById(courseId ?? "", quizId ?? "");
  // console.log("quiz", quiz);

  const validatedCourseId = courseId ? courseId : "";

  let quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  // console.log("quiz before fetch quiz details", quiz);
  const dispatch = useDispatch();

  const fetchQuiz = async () => {
    const quiz = await quizzesClient.fetchQuizById(validatedCourseId, quizId);
    console.log("quiz in fetch quiz", quiz);
    dispatch(setQuiz(quiz));
  };

  useEffect(() => {
    fetchQuiz();
    quizzesClient
      .fetchQuizById(validatedCourseId, quizId)
      .then((quizzes) => dispatch(setQuizzes(quizzes)));
  }, [validatedCourseId]);

  console.log("quiz in editQuiz", quiz);

  return (
    // nav bar to alternate between details and questions
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
      </div>

      {/* all the questions in order */}
      <hr />

      <QuestionList />

      <div></div>
      {/* buttons here for new question, new question group, find question */}
      <div className="d-flex justify-content-around">
        <button className="btn btn-light" onClick={addNewQuestion}>
          + New Question
        </button>
        <button className="btn btn-light">+ New Question Group</button>
        <button className="btn btn-light">
          <FaSearch /> Find Question
        </button>
      </div>
      <hr />
      <div className="d-flex justify-content-end">
        <button className="btn btn-light">Cancel</button>
        <button className="btn btn-light">Save & Publish</button>
        <button className="btn btn-danger">Save</button>
      </div>
    </div>
  );
}
