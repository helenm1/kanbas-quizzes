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
import { QuestionType } from "../constants";
import MCQuestionAnswer from "../Editor/Editor/MCQuestionAnswer";
import TFQuestionAnswer from "../Editor/Editor/TFQuestionAnswer";
import FillInTheBlankQuestionAnswer from "../Editor/Editor/FillInTheBlankQuestionAnswer";

export default function Preview() {
  const { courseId, quizId } = useParams();
  const validatedCourseId = courseId ? courseId : "";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();

  let quiz =
    useSelector((state: KanbasState) => state.quizzesReducer.quiz) || {};

  const dispatch = useDispatch();

  const fetchQuiz = async () => {
    const quiz = await quizzesClient.fetchQuizById(validatedCourseId, quizId);
    dispatch(setQuiz(quiz));
    if (quiz.questions) {
      setQuestions(quiz.questions);
    }
  };

  // const [loading, setLoading] = useState(true);

  // const fetchAllQuestions = async () => {
  //   const fetchedQuestions = await quizzesClient.fetchQuestionsByQuiz(
  //     validatedCourseId,
  //     quizId
  //   );
  //   return fetchedQuestions; // Return the fetched questions
  // };

  useEffect(() => {
    fetchQuiz();
    // fetchAllQuestions();
    quizzesClient
      .fetchQuizById(validatedCourseId, quizId)
      .then((quizzes) => dispatch(setQuizzes(quizzes)));
    async function getQuestions() {
      // const fetchedQuestions = await fetchAllQuestions();
      // setQuestions(fetchedQuestions);
      if (quiz.questions) {
        setQuestions(quiz.questions);
      }
      // setLoading(false);
    }
    getQuestions();
  }, [validatedCourseId]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

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
        <div className="w-75">
          {selectedQuestion && (
            <div className="p-3 border">
              <div className="question-title d-flex justify-content-between">
                <h5>{selectedQuestion.title}</h5>
                <h6>{selectedQuestion.points} pts</h6>
              </div>
              <hr />
              <p>{selectedQuestion.description}</p>
              {/* Render other details of the selected question */}
              <hr />
              {selectedQuestion.type === QuestionType.MULTIPLE_CHOICE ? (
                <div>
                  {selectedQuestion?.options?.map((option, index) => (
                    <div key={index}>
                      <label>
                        <input type="radio" name="answer" value={option} />{" "}
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              ) : selectedQuestion.type === QuestionType.TRUE_FALSE ? (
                <div>
                  <div>
                    <label>
                      <input type="radio" name="answer" value="true" /> True
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="answer" value="false" /> False
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  <div> Your Answer: </div>
                  <input type="text"></input>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="w-25">
          {questions.map((question, index) => (
            <button
              className="question-button"
              key={index}
              onClick={() => {
                setSelectedQuestion(question);
              }}
            >
              <p>{question.title} </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
