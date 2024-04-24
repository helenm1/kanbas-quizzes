import { FormEvent, useEffect, useState } from "react";
import { Question } from "../../types";
import "./QuestionEditor.css";
import MCQuestionAnswer from "./MCQuestionAnswer";
import { FaCheck } from "react-icons/fa";
import TFQuestionAnswer from "./TFQuestionAnswer";
import FillInTheBlankQuestionAnswer from "./FillInTheBlankQuestionAnswer";
import { QuestionType } from "../../constants";

export interface QuizEditableQuestionProps {
  question: Question;
  index: number;
  updateQuestion: (index: number, question: Question) => void;
  deleteQuestion: (index: number) => void;
}

function QuestionEditor({
  question,
  index,
  updateQuestion,
  deleteQuestion,
}: QuizEditableQuestionProps) {
  const [currQuestion, setCurrQuestion] = useState<Question>(
    JSON.parse(JSON.stringify(question))
  );

  const [changesSaved, setChangesSaved] = useState<boolean>(false);

  useEffect(() => {
    if (JSON.stringify(question) === JSON.stringify(currQuestion)) {
      setChangesSaved(true);
    } else {
      setChangesSaved(false);
    }
  }, [question, currQuestion]);

  const handleQuestionTypeChange = (e: FormEvent<HTMLSelectElement>) => {
    const updatedQuestion = {
      ...question,
      type: e.currentTarget.value as QuestionType,
      options: [],
      answers: [],
    };
    updateQuestion(index, updatedQuestion);
  };
  const handleDescriptionOnChange = (e: any) => {
    const updatedQuestion = { ...question, description: e.target.value };
    updateQuestion(index, updatedQuestion);
  };

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestion = { ...question, title: e.target.value };
    updateQuestion(index, updatedQuestion);
  };

  const handlePointsOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestion = { ...question, points: parseInt(e.target.value) };
    updateQuestion(index, updatedQuestion);
  };

  const handleCancel = () => {
    console.log(currQuestion);
    updateQuestion(index, currQuestion);
  };

  const handleSave = () => {
    if (question.options.length !== new Set(question.options).size) {
      alert("Cannot have duplicate options, please fix and then try again.");
    } else {
      setCurrQuestion(question);
    }
  };

  return (
    <div className="flex-fill d-flex flex-column gap-1 border border-2 m-3">
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-row w-75 p-2">
          <input
            className="form-control w-25 m-2"
            type="text"
            value={question.title}
            placeholder="Question Title"
            onChange={handleTitleOnChange}
          />
          <select
            className="form-select w-25 m-2"
            onChange={handleQuestionTypeChange}
            value={question.type}
          >
            <option value={QuestionType.MULTIPLE_CHOICE}>
              Multiple Choice
            </option>
            <option value={QuestionType.TRUE_FALSE}>True/False</option>
            <option value={QuestionType.FILL_IN_THE_BLANK}>
              Fill in the Blank
            </option>
          </select>
        </div>
        <div className="points-container">
          pts:
          <input
            className="form-control w-25 points"
            type="number"
            min="0"
            value={question.points}
            onChange={handlePointsOnChange}
          />
        </div>
      </div>
      <hr />
      <div className="question-container">
        Question:
        <div className="question-desc">
          <textarea
            className="form-control"
            value={question.description}
            onChange={handleDescriptionOnChange}
            placeholder="Question Description"
          />{" "}
        </div>
        Answers:
        {question.type === QuestionType.MULTIPLE_CHOICE ? (
          <MCQuestionAnswer
            question={question}
            index={index}
            updateQuestion={updateQuestion}
          />
        ) : question.type === QuestionType.TRUE_FALSE ? (
          <TFQuestionAnswer
            question={question}
            index={index}
            updateQuestion={updateQuestion}
          />
        ) : (
          <FillInTheBlankQuestionAnswer
            question={question}
            index={index}
            updateQuestion={updateQuestion}
          />
        )}
      </div>
      <div className="question-buttons-container">
        <div className="left-buttons">
          <button className="btn wd-modules-btn" onClick={handleCancel}>
            {" "}
            Cancel{" "}
          </button>
          <button className="btn btn-danger" onClick={handleSave}>
            {" "}
            Update Question{" "}
          </button>
          <div className="saved-text">
            {changesSaved ? (
              <>
                <FaCheck style={{ color: "green" }} /> All Changes Saved{" "}
              </>
            ) : (
              "Changes Not Saved"
            )}
          </div>
        </div>
        <button
          className="btn btn-danger"
          onClick={() => deleteQuestion(index)}
        >
          Delete Question
        </button>
      </div>
    </div>
  );
}

export default QuestionEditor;
