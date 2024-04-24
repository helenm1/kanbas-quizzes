import { FaTrash } from "react-icons/fa";
// import { Question } from "../types";
import { Question } from "../../types";
import "./QuestionEditor.css";

export type FillInTheBlankQuestionAnswerProps = {
  question: Question;
  index: number;
  updateQuestion: (index: number, question: Question) => void;
};

function FillInTheBlankQuestionAnswer({
  question,
  index,
  updateQuestion,
}: FillInTheBlankQuestionAnswerProps) {
  const handleAnswerOnChange = (ansIndex: number, answer: string) => {
    const updatedAnswers = [...question.answers];
    updatedAnswers[ansIndex] = answer;
    const updatedQuestion = { ...question, answers: updatedAnswers };
    updateQuestion(index, updatedQuestion);
  };

  const createNewAnswer = () => {
    const newAnswer = `Answer ${question.answers.length + 1}`;
    const updatedAnswers = [...question.answers, newAnswer];
    updateQuestion(index, { ...question, answers: updatedAnswers });
  };

  const handleRemoveAnswer = (answer: string) => {
    const updatedAnswers = question.answers.filter((ans) => ans !== answer);
    const updatedQuestion = {
      ...question,
      answers: updatedAnswers,
    };
    updateQuestion(index, updatedQuestion);
  };

  console.log("question", question);
  console.log("question.answers", question.answers);

  return (
    <>
      <div className="answers-container">
        {question.answers.map((answer, ansIndex) => (
          <div className="option" key={`option-div-${ansIndex}`}>
            Possible Answer
            <textarea
              key={ansIndex}
              className="form-control"
              value={answer}
              onChange={(e) => handleAnswerOnChange(ansIndex, e.target.value)}
              placeholder={`Answer ${ansIndex + 1}`}
            />
            <button
              className="btn"
              onClick={() => {
                handleRemoveAnswer(answer);
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

export default FillInTheBlankQuestionAnswer;
