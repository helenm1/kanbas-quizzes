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

function QuizList() {
  const { courseId } = useParams();
  const validatedCourseId = courseId ? courseId : "";

  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );

  const dispatch = useDispatch();

  const fetchAllQuizzes = async () => {
    const quizzes = await quizzesClient.findQuizzesForCourse(validatedCourseId);
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchAllQuizzes();
    quizzesClient
      .findQuizzesForCourse(validatedCourseId)
      .then((quizzes) => dispatch(setQuizzes(quizzes)));
  }, [validatedCourseId]);

  return (
    <>
      <div className="d-flex justify-content-end mt-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search for Quiz"
        />
        <button className="btn btn-danger">+ Quiz</button>
        <button className="btn btn-light">
          <FaEllipsisV />
        </button>
      </div>
      <hr />

      <ul className="list-group">
        {quizList
          .filter((quiz) => quiz.course === courseId)
          .map((quiz) => (
            <Link
              to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
              className="text-decoration-none"
              key={quiz._id}
            >
              <li className="list-group-item list-group-item-action">
                <div>
                  <FaRocket className="me-2 fa-rocket" />
                  {quiz.name}
                  <span className="float-end">
                    <FaCheckCircle className="text-success" />
                    <FaEllipsisV className="ms-2" />
                  </span>
                  <p>
                    {" "}
                    {quiz.availability} | {quiz.dueDate} | {quiz.points} |{" "}
                    {`${quiz.numQuestions} Questions`}
                  </p>
                </div>
              </li>
            </Link>
          ))}
      </ul>
    </>
  );
}
export default QuizList;
