import React, { useState, useEffect } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaRocket, FaBan } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router";
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
  const { pathname } = useLocation();
  // const newPath = pathname.substring(0, pathname.lastIndexOf("/"));

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
        <button
          className="btn btn-danger"
          onClick={async () => {
            await quizzesClient.createQuiz(validatedCourseId, {
              name: "New Quiz",
              dueDate: Date.now(),
              availableDate: Date.now(),
              untilDate: Date.now(),
              course: validatedCourseId,
            });
            fetchAllQuizzes();
            window.location.replace(
              "#" +
                pathname +
                `/${quizList[quizList.length - 1]._id}/editor/editdetails`
            );
            // window.location.replace(
            //   `/Kanbas/Courses/${courseId}/Quizzes/${
            //     quizList[quizList.length - 1]._id
            //   }`
            // );
            // window.location.reload();
          }}
        >
          + Quiz
        </button>
        <button className="btn btn-light">
          <FaEllipsisV />
        </button>
      </div>
      <hr />

      <ul className="list-group">
        {quizList
          .filter((quiz) => quiz.course === courseId)
          .map((quiz) => (
            <li className="list-group-item list-group-item-action">
              <div>
                <Link
                  to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                  className="text-decoration-none"
                  key={quiz._id}
                >
                  <FaRocket className="me-2 fa-rocket" />
                  {quiz.name}
                </Link>
                <span className="float-end">
                  {quiz.published ? (
                    <FaCheckCircle
                      className="text-success"
                      onClick={() => {
                        quizzesClient.unpublishQuiz(validatedCourseId, quiz);
                        window.location.reload();
                      }}
                    />
                  ) : (
                    <FaBan
                      className="text-danger"
                      onClick={() => {
                        quizzesClient.publishQuiz(
                          validatedCourseId,
                          quiz,
                          quiz._id
                        );
                        window.location.reload();
                      }}
                    />
                  )}
                  <FaEllipsisV className="ms-2" />
                </span>
                <p>
                  {" "}
                  {quiz.availability} | {quiz.dueDate} | {quiz.points} |{" "}
                  {`${quiz.questions.length} Questions`}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
export default QuizList;
