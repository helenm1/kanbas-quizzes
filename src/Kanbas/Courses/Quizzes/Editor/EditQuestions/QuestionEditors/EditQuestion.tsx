import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import FIEditor from "./FIEditor";
import MCEditor from "./MCEditor";
import TFEditor from "./TFEditor";
import { Question } from "../client";
import * as questionsClient from "../client";
import { setQuestion, updateQuestion } from "../reducer";
import { setQuiz } from "../../../reducer";
import React, { useState, useEffect } from "react";

export default function EditQuestion(props: any) {
  const { courseId, quizId } = useParams();
  const validatedCourseId = courseId ? courseId : "";
  const validatedQuizId = quizId ? quizId : "";
  const validatedQuestionId = props.question._id ?? "";

  const [question, setQuestion] = useState(props.question);

  useEffect(() => {
    setQuestion(props.question);
  }, [props.question]);

  const dispatch = useDispatch();

  const fetchQuestion = async (updatedQuestion: Question) => {
    console.log(
      "IDs in fetchQuestion",
      validatedCourseId,
      validatedQuizId,
      validatedQuestionId
    );
    const question = await questionsClient.findQuestionById(
      validatedCourseId,
      validatedQuizId,
      validatedQuestionId
    );
    console.log("question in fetchQuestion", question);
    setQuestion(updatedQuestion);
  };

  // const handleUpdateQuestion = async () => {
  //   await questionsClient.updateQuestion(
  //     validatedCourseId,
  //     validatedQuizId,
  //     validatedQuestionId,
  //     question
  //   );
  //   dispatch(updateQuestion(question));
  //   fetchQuestion();
  // };

  const handleUpdateQuestion = async () => {
    const updatedQuestion = await questionsClient.updateQuestion(
      validatedCourseId,
      validatedQuizId,
      validatedQuestionId,
      question
    );
    dispatch(updateQuestion(updatedQuestion));
    fetchQuestion(updatedQuestion);
  };

  return (
    <div>
      <input
        type="text"
        className="form-control"
        value={question.questionTitle}
        onChange={(e) =>
          setQuestion({ ...question, questionTitle: e.target.value })
        }
      />
      <select
        className="form-control"
        value={question.questionType}
        onChange={(e) =>
          setQuestion({ ...question, questionType: e.target.value })
        }
      >
        <option value="MULTIPLE_CHOICE">Multiple Choice</option>
        <option value="TRUE_FALSE">True False</option>
        <option value="FILL_IN">Fill In</option>
      </select>
      {question.questionType === "TRUE_FALSE" && <TFEditor />}
      {question.questionType === "MULTIPLE_CHOICE" && <MCEditor />}
      {question.questionType === "FILL_IN" && <FIEditor />}
      <button
        className="btn btn-primary"
        onClick={() => handleUpdateQuestion()}
      >
        Update Question
      </button>
    </div>
  );
}
