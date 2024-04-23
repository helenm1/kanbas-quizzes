import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { KanbasState } from "../../../../store";

export default function ViewQuestion(question: any) {
  const { courseId, quizId } = useParams();
  const validatedCourseId = courseId ? courseId : "";
  const validatedQuizId = quizId ? quizId : "";

  console.log("question", question.question);
  question = question.question;

  return (
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
  );
}
