import React, { useState, useEffect } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaRocket } from "react-icons/fa";
import { useNavigate, useParams, Route, Routes } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
} from "./reducer";
import { KanbasState } from "../../store";
import * as quizzesClient from "./client";
import { Quiz } from "./client";
import { Link } from "react-router-dom";
import EditDetails from "./Editor/EditDetails";
import EditQuestions from "./Editor/EditQuestions";

function QuizDetails() {
  const { courseId } = useParams();
  const { quizId } = useParams();

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

  const navigate = useNavigate();
  const goToEditor = () => {
    navigate(`Editor`);
  };

  return (
    <>
      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-success">Published</button>
        <button className="btn btn-light">Preview</button>
        <button className="btn btn-light" onClick={goToEditor}>
          Edit
        </button>
        <button className="btn btn-light">
          <FaEllipsisV />
        </button>
      </div>

      <hr />
      <h1>{quiz.name}</h1>
      <div>
        <p>
          <strong>Quiz Type </strong>
          {quiz.quizType}
        </p>
        <p>
          <strong>Points </strong>
          {quiz.points}
        </p>
        <p>
          <strong>Assignment Group </strong>
          {quiz.assignmentGroup}
        </p>
        <p>
          <strong>Shuffle Answers </strong>
          {quiz.shuffleAnswers}
        </p>
        <p>
          <strong>Time Limit </strong>
          {quiz.timeLimit} Minutes
        </p>
        <p>
          <strong>View Responses </strong>
          Always
        </p>
        <p>
          <strong>Show Correct Answers </strong>
          {quiz.showCorrectAnswers}
        </p>
        <p>
          <strong>One Question at a Time </strong>
          {quiz.oneQuestionAtATime}
        </p>
        <p>
          <strong>Require Respondus LockDown Browser </strong>
          No
        </p>
        <p>
          <strong>Required to View Quiz Results </strong>
          No
        </p>
        <p>
          <strong>Webcam Required </strong>
          {quiz.webcamRequired}
        </p>
        <p>
          <strong>Lock Questions After Answering </strong>
          {quiz.lockQuestionsAfterAnswering}
        </p>
      </div>
    </>
  );
}
export default QuizDetails;
