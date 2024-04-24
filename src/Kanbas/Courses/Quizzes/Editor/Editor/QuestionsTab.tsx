import { useEffect, useState } from "react";
import "./QuestionsTab.css";
import { FaBan, FaCheck, FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
// import { Question } from "../types";
import { Question } from "../../types";

import QuestionEditor from "./QuestionEditor";
// import EditorNav from "../DetailsEditor/EditorNav";
import EditorNav from "../EditorNav";
import { useParams } from "react-router";
// import * as client from "../Preview/client";
import * as quizClient from "../../client";
// import * as questionsClient from "./client";
// import { QuestionType } from "../Preview/constants";
import { QuestionType } from "../../constants";
// import { Quiz } from "../Preview";
import { Quiz } from "..";

function QuestionsTab() {
  // console.log("reached QuestionsTab");
  const { courseId, quizId } = useParams();
  const validatedCourseId = courseId ?? "";
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [initialQuestions, setInitialQuestions] = useState<Question[]>([]);

  console.log("questions after const ", questions);

  useEffect(() => {
    const getQuiz = async () => {
      if (quizId) {
        const quizResponse = await quizClient.fetchQuizById(
          validatedCourseId,
          quizId
        );
        console.log("quizResponse", quizResponse);
        setQuiz(quizResponse);
        setInitialQuestions(quizResponse.questions);

        setQuestions(quizResponse.questions);
      }
    };
    getQuiz();
  }, [quizId]);

  const addNewQuestion = () => {
    const newQuestion: Question = {
      title: "",
      type: QuestionType.MULTIPLE_CHOICE,
      points: 0,
      description: "",
      answers: [],
      options: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, question: Question) => {
    const updatedQuestions: Question[] = [...questions];
    updatedQuestions[index] = question;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, idx) => idx !== index);
    setQuestions(updatedQuestions);
  };

  const handleSave = async (publish?: boolean) => {
    publish = publish ?? false;
    if (quiz) {
      const points = questions.reduce((acc, curr) => acc + curr.points, 0);
      let newQuiz = { ...quiz, questions, points, published: publish };
      if (publish) {
        newQuiz = { ...newQuiz, published: true };
      }
      await quizClient.publishQuiz(validatedCourseId, newQuiz, publish);
      await quizClient.updateQuiz(validatedCourseId, newQuiz);

      setQuiz(newQuiz);
    }
  };

  const handleCancel = () => {
    setQuestions(JSON.parse(JSON.stringify(initialQuestions)));
  };

  const handleSaveAndPublish = () => {
    handleSave(true);
  };

  console.log("questions", questions);
  console.log("quiz before rendering", quiz);
  console.log("quiz published before rendering", quiz?.published);

  return (
    <div className="flex-fill">
      <div className="question-editor-header">
        <div className="points-text">Points {quiz ? quiz.points : "0"} </div>
        <div>
          {quiz && quiz.published ? (
            <>
              <FaCheck style={{ alignSelf: "center", color: "green" }} />{" "}
              Published
            </>
          ) : (
            <>
              <FaBan style={{ alignSelf: "center", color: "grey" }} /> Not
              Published{" "}
            </>
          )}
        </div>
      </div>
      <hr />
      <EditorNav />
      <div className="questions">
        {questions.map((question, idx) => (
          <QuestionEditor
            key={idx}
            index={idx}
            question={question}
            updateQuestion={updateQuestion}
            deleteQuestion={deleteQuestion}
          />
        ))}
      </div>
      <div className="question-editor-buttons-footer">
        <button className="btn wd-modules-btn" onClick={addNewQuestion}>
          {" "}
          <FaPlus style={{ color: "grey", marginRight: "0.2em" }} /> New
          Question
        </button>
        <button className="btn wd-modules-btn">
          {" "}
          <FaPlus style={{ color: "grey", marginRight: "0.2em" }} /> New
          Question Group
        </button>
        <button className="btn wd-modules-btn">
          {" "}
          <FaMagnifyingGlass
            style={{ color: "grey", marginRight: "0.2em" }}
          />{" "}
          Find Question
        </button>
      </div>
      <hr />
      <div className="question-editor-publish-footer">
        <label>
          <input type="checkbox" name="notify" /> Notify users this quiz has
          changed
        </label>
        <div className="d-flex flex-row">
          <button className="btn wd-modules-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn wd-modules-btn" onClick={handleSaveAndPublish}>
            Save & Publish
          </button>
          <button className="btn btn-danger" onClick={() => handleSave()}>
            Save
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default QuestionsTab;
