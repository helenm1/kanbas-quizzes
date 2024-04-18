import React, { useState, useEffect } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaRocket } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
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

  // const fetchAllQuizzes = async () => {
  //   const quizzes = await quizzesClient.findQuizzesForCourse(validatedCourseId);
  //   dispatch(setQuizzes(quizzes));
  // };

  useEffect(() => {
    fetchQuiz();
    quizzesClient
      .fetchQuizById(validatedCourseId, quizId)
      .then((quizzes) => dispatch(setQuizzes(quizzes)));
  }, [validatedCourseId]);

  return (
    <>
      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-success">Published</button>
        <button className="btn btn-light">Preview</button>
        <button className="btn btn-light">Edit</button>
        <button className="btn btn-light">
          <FaEllipsisV />
        </button>
      </div>
      <hr />

      <h1>Quiz details for {quiz.name}</h1>
    </>
  );
}
export default QuizDetails;
