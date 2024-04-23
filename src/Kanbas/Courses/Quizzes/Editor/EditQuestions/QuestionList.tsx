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
import { useCallback, useEffect, useState } from "react";
import { Question } from "./client";

import ViewQuestion from "./ViewQuestion";
import EditQuestion from "./QuestionEditors/EditQuestion";

function QuestionList() {
  const { courseId, quizId } = useParams();
  // console.log("courseId in questionlist", courseId);
  // console.log("quizId in questionlist", quizId);
  const validatedCourseId = courseId ? courseId : "";
  const validatedQuizId = quizId ? quizId : "";

  const questionList = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );

  const [editingQuestionIds, setEditingQuestionIds] = useState<string[]>([]);

  const toEditMode = (id: string) => {
    setEditingQuestionIds([id]);
  };

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

  // return (
  //   <div>
  //     <ul className="list-group">
  //       {questionList
  //         .filter((question) => question.quizId === quizId)
  //         .map((question) => (
  //           <li>
  //             <ViewQuestion question={question} />

  //             <button className="btn btn-primary">Edit</button>
  //             <button
  //               className="btn btn-danger"
  //               onClick={(event) => {
  //                 event.preventDefault();
  //                 console.log("question in onclick", question);
  //                 console.log("questionList before delete", questionList);

  //                 deleteQuestion(question);
  //                 console.log("questionList after delete", questionList);
  //                 // console.log(KanbasState.questionsReducer.questions);
  //               }}
  //             >
  //               Delete
  //             </button>
  //             <hr />
  //           </li>
  //         ))}
  //     </ul>
  //   </div>
  // );
  return (
    <div>
      <ul className="list-group">
        {questionList
          .filter((question) => question.quizId === quizId)
          .map((question) => (
            <li>
              {editingQuestionIds.includes(question._id) ? (
                <EditQuestion question={question} />
              ) : (
                <ViewQuestion question={question} />
              )}

              <button
                className="btn btn-primary"
                onClick={() => toEditMode(question._id)}
              >
                Edit
              </button>
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
