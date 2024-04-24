import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import EditDetails from "../Editor/EditDetails";
import { useParams } from "react-router-dom";
// import EditQuestions from "../Editor/EditQuestions";
import { KanbasState } from "../../../store";
import * as quizzesClient from "../client";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz, setQuizzes } from "../reducer";
import { useEffect } from "react";
import "./index.css";
import { FaExclamationCircle } from "react-icons/fa";

export default function Preview() {
  console.log("on preview ");
  const { courseId, quizId } = useParams();
  const validatedCourseId = courseId ? courseId : "";

  let quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const dispatch = useDispatch();

  const fetchQuiz = async () => {
    const quiz = await quizzesClient.fetchQuizById(validatedCourseId, quizId);
    dispatch(setQuiz(quiz));
  };

  useEffect(() => {
    fetchQuiz();
    quizzesClient
      .fetchQuizById(validatedCourseId, quizId)
      .then((quizzes) => dispatch(setQuizzes(quizzes)));
  }, [validatedCourseId]);

  return (
    <div>
      <h1>{quiz.name}</h1>
      <br />
      <div className="previewBox p-3 mb-2">
        <FaExclamationCircle className="circleIcon" />
        This is a preview of the published version of the quiz
      </div>
      <br />
      <h3>Quiz Instructions</h3>
      <hr />
    </div>
  );
}
