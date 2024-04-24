import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router";
import EditDetails from "./EditDetails";
import EditQuestions from "./EditQuestions";
import { QuestionType, QuizType, AssignmentGroup } from "../constants";
import QuestionEditor from "./Editor/QuestionEditor";
import QuestionsTab from "./Editor/QuestionsTab";

export type Question = {
  title: string;
  type: QuestionType;
  points: number;
  description: string;
  answers: string[];
  options: string[];
};

export type Quiz = {
  _id: string;
  isPublished: boolean;
  questions: Question[];
  title: string;
  description: string;
  type: QuizType;
  points: number;
  assignmentGroup: AssignmentGroup;
  shuffleAnswers: boolean;
  timeLimit?: number;
  multipleAttempts: boolean;
  showCorrectAnswers?: Date;
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: Date;
  availableDate: Date;
  untilDate: Date;
};

export type QuestionResult = {
  score: number;
  result: boolean[];
};

export default function Editor() {
  const params = useParams();
  const { courseId, quizId } = params;
  console.log("courseId", courseId);
  console.log("quizId", quizId);

  return (
    <div>
      <h1>Quiz Editor</h1>
      <nav className="nav nav-tabs mt-2">
        <Link className="nav-link" to="editdetails">
          Details
        </Link>
        <Link className="nav-link" to="editquestions">
          Questions
        </Link>
        <Routes>
          <Route path="editdetails" element={<EditDetails />} />
          <Route path="editquestions" element={<QuestionsTab />} />
        </Routes>
      </nav>
    </div>
  );
}
