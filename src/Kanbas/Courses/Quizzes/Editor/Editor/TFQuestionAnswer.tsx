// import { Question, TrueFalseAnswer } from "../types";
import { Question, TrueFalseAnswer } from "../../types";
import "./QuestionEditor.css";

export type TFQuestionAnswerProps = {
  question: Question;
  index: number;
  updateQuestion: (index: number, question: Question) => void;
};

function TFQuestionAnswer({
  question,
  index,
  updateQuestion,
}: TFQuestionAnswerProps) {
  const handleAnswerSelect = (answer: string) => {
    let updatedAnswers = [answer];
    const updatedQuestion = { ...question, answers: updatedAnswers };
    updateQuestion(index, updatedQuestion);
  };
  return (
    <>
      <div className="answers-container">
        <div className="option" key={`option-true-${index}`}>
          <input
            key={`input-${index}`}
            type="radio"
            name="option-select"
            checked={question.answers.includes(TrueFalseAnswer.true)}
            onChange={() => handleAnswerSelect(TrueFalseAnswer.true)}
          />{" "}
          True
        </div>
        <div className="option" key={`option-false-${index}`}>
          <input
            key={`input-${index}`}
            type="radio"
            name="option-select"
            checked={question.answers.includes(TrueFalseAnswer.false)}
            onChange={() => handleAnswerSelect(TrueFalseAnswer.false)}
          />{" "}
          False
        </div>
      </div>
    </>
  );
}

export default TFQuestionAnswer;
