import { FaTrash } from "react-icons/fa";
import { Question } from "../../types";

import "./QuestionEditor.css";

export type MCQuestionAnswerProps = {
  question: Question;
  index: number;
  updateQuestion: (index: number, question: Question) => void;
};

function MCQuestionAnswer({
  question,
  index,
  updateQuestion,
}: MCQuestionAnswerProps) {
  const handleOptionOnChange = (opIndex: number, newAnswer: string) => {
    const updatedOptions = [...question.options];
    updatedOptions[opIndex] = newAnswer;
    const updatedQuestion = { ...question, options: updatedOptions };
    updateQuestion(index, updatedQuestion);
  };

  const createNewAnswer = () => {
    const newOption = "";
    const updatedOptions = [...question.options, newOption];
    updateQuestion(index, { ...question, options: updatedOptions });
  };

  const handleAnswerSelect = (answer: string) => {
    let updatedAnswers = [answer];
    const updatedQuestion = { ...question, answers: updatedAnswers };
    updateQuestion(index, updatedQuestion);
  };

  const handleRemoveOption = (opIndex: number, option: string) => {
    const updatedOptions = question.options.filter((_, idx) => idx !== opIndex);
    const updatedAnswers = question.answers.filter((ans) => ans !== option);
    const updatedQuestion = {
      ...question,
      options: updatedOptions,
      answers: updatedAnswers,
    };
    updateQuestion(index, updatedQuestion);
  };

  return (
    <>
      <div className="answers-container">
        {question.options.map((option, opIndex) => (
          <div className="option" key={`option-div-${opIndex}`}>
            {question.answers.includes(option)
              ? "Correct Answer"
              : "Possible Answer"}
            <input
              key={`input-${opIndex}`}
              type="radio"
              name="option-select"
              checked={question.answers.includes(option)}
              onChange={() => handleAnswerSelect(option)}
            />
            <textarea
              key={opIndex}
              className="form-control"
              value={option}
              onChange={(e) => handleOptionOnChange(opIndex, e.target.value)}
              placeholder={`Option ${opIndex + 1}`}
            />
            <button
              className="btn"
              onClick={() => {
                handleRemoveOption(opIndex, option);
              }}
            >
              <FaTrash style={{ color: "gray" }} />
            </button>
          </div>
        ))}
      </div>
      <div className="create-answer">
        <button className="btn" onClick={createNewAnswer}>
          + Add Another Answer
        </button>
      </div>
    </>
  );
}

export default MCQuestionAnswer;
