import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import * as questionsClient from "./client";

import {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  setQuestion,
  setQuestions,
} from "./reducer";
import { useCallback, useEffect } from "react";
import { Question } from "./client";

function QuestionList() {
  const { courseId, quizId } = useParams();
  // console.log("courseId in questionlist", courseId);
  // console.log("quizId in questionlist", quizId);
  const validatedCourseId = courseId ? courseId : "";
  const validatedQuizId = quizId ? quizId : "";

  const questionList = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );

  console.log("questionlist after questionlist init", questionList);

  const dispatch = useDispatch();

  const fetchAllQuestions = async () => {
    const questions = await questionsClient.findQuestionsForQuiz(
      validatedCourseId,
      validatedQuizId
    );
    dispatch(setQuestions(questions));
  };

  // const deleteQuestion = async (question: Question) => {
  //   console.log("reached deleteQuestion in questionlist");
  //   console.log("question in deleteQuestion (Questionlist)", question);
  //   const questions = await questionsClient.deleteQuestion(
  //     courseId ?? "",
  //     quizId ?? "",
  //     question
  //   );
  //   dispatch(setQuestions(questions));
  // };

  const deleteQuestion = async (question: Question) => {
    console.log("feeding this question to delete question", question);
    const response = await questionsClient.deleteQuestion(
      courseId ?? "",
      quizId ?? "",
      question
    );
    fetchAllQuestions();
    // if (response && Array.isArray(response.questions)) {
    //   dispatch(setQuestions(response.questions));
    // } else {
    //   console.error("Unexpected response from deleteQuestion:", response);
    // }
  };

  useEffect(() => {
    fetchAllQuestions();
    questionsClient
      .findQuestionsForQuiz(validatedCourseId, validatedQuizId)
      .then((questions) => dispatch(setQuestions(questions)));
  }, [validatedCourseId, validatedQuizId]);

  return (
    <div>
      <ul className="list-group">
        {questionList
          .filter((question) => question.quizId === quizId)
          .map((question) => (
            <li>
              <div>
                <h4>
                  <strong>{question.questionText}</strong>
                </h4>
                <p>Points: {question.points}</p>
                {question.questionType === "TRUE_FALSE" && (
                  <p>
                    Answer: <strong>{question.tfAnswer.toString()}</strong>
                  </p>
                )}
                {question.questionType === "MULTIPLE_CHOICE" && (
                  <div>
                    {question.mcAnswers.map((answer: any) => (
                      <div>
                        <p>
                          Answer: <strong>{answer.answer}</strong>
                        </p>
                        <p>Correct: {answer.correct.toString()}</p>
                      </div>
                    ))}
                  </div>
                )}
                {question.questionType === "FILL_IN" && (
                  <p>
                    Answer: <strong>{question.fillInAnswers}</strong>
                  </p>
                )}
              </div>
              <button className="btn btn-primary">Edit</button>
              <button
                className="btn btn-danger"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("question in onclick", question);
                  console.log("questionList before delete", questionList);

                  deleteQuestion(question);
                  console.log("questionList after delete", questionList);
                  // console.log(KanbasState.questionsReducer.questions);
                }}
              >
                Delete
              </button>
              <hr />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default QuestionList;
