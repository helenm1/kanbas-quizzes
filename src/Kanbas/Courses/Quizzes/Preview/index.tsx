import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import EditDetails from "../Editor/EditDetails";
import { useParams } from "react-router-dom";
// import EditQuestions from "../Editor/EditQuestions";
import { KanbasState } from "../../../store";
import * as quizzesClient from "../client";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz, setQuizzes } from "../reducer";
import { useEffect, useState } from "react";
import "./index.css";
import { FaExclamationCircle } from "react-icons/fa";
import { Question } from "../client";

export default function Preview() {
  const { courseId, quizId } = useParams();
  const validatedCourseId = courseId ? courseId : "";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();

  let quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const dispatch = useDispatch();

  const fetchQuiz = async () => {
    const quiz = await quizzesClient.fetchQuizById(validatedCourseId, quizId);
    dispatch(setQuiz(quiz));
  };

  const fetchAllQuestions = async () => {
    const fetchedQuestions = await quizzesClient.fetchQuestionsByQuiz(
      validatedCourseId,
      quizId
    );
    return fetchedQuestions; // Return the fetched questions
  };

  useEffect(() => {
    fetchQuiz();
    fetchAllQuestions();
    quizzesClient
      .fetchQuizById(validatedCourseId, quizId)
      .then((quizzes) => dispatch(setQuizzes(quizzes)));
    async function getQuestions() {
      const fetchedQuestions = await fetchAllQuestions();
      setQuestions(fetchedQuestions);
    }
    getQuestions();
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

      <div className="d-flex">
        <div className="w-50">
          {selectedQuestion && (
            <div>
              <h1>{selectedQuestion.title}</h1>
              <h5>{selectedQuestion.description}</h5>
              {/* Render other details of the selected question */}
            </div>
          )}
        </div>
        <div className="w-50">
          {questions.map((question, index) => (
            <button
              className="btn btn-danger"
              key={index}
              onClick={() => {
                console.log(question);
                setSelectedQuestion(question);
              }}
            >
              <h3>{question.title} </h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
