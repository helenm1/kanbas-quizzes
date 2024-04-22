import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import EditQuestions from "../EditQuestions";
import { useParams } from "react-router-dom";
import * as quizzesClient from "../../client";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { setQuiz, setQuizzes } from "../../reducer";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./index.css";

export default function EditDetails() {
  const { courseId, quizId } = useParams();
  const validatedCourseId = courseId ? courseId : "";
  const [text, setText] = useState("");
  const [value, setValue] = useState("<p>TinyMCE editor text</p>");

  let quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  // console.log("quiz before fetch quiz details", quiz);
  const dispatch = useDispatch();

  const fetchQuiz = async () => {
    const quiz = await quizzesClient.fetchQuizById(validatedCourseId, quizId);
    console.log("quiz in fetch quiz", quiz);
    dispatch(setQuiz(quiz));
  };
  useEffect(() => {
    fetchQuiz();
    quizzesClient
      .fetchQuizById(validatedCourseId, quizId)
      .then((quizzes) => dispatch(setQuizzes(quizzes)));
  }, [validatedCourseId]);

  return (
    <div>
      <h1>Edit Details</h1>
      <div>
        <nav className="nav nav-tabs mt-2">
          <Link
            className="nav-link"
            to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/editor/editdetails`}
          >
            Details
          </Link>
          <Link
            className="nav-link"
            to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/editor/editquestions`}
          >
            Questions
          </Link>
          <Routes>
            <Route path="EditDetails" element={<EditDetails />} />
            <Route path="EditQuestions" element={<EditQuestions />} />
          </Routes>
        </nav>
      </div>
      <br />
      <input
        value={quiz.name}
        // onChange={(e) =>
        //   dispatch(setModule({ ...module, name: e.target.value }))
        // }
        className="form-control"
        placeholder="Quiz Name"
      />
      <br />
      <p>Quiz Instructions:</p>
      <Editor
        apiKey="zlv0ljcd3b15hbahhzsxkdl856ug1hlqcfffxhtdwpwi12h2"
        onEditorChange={(newValue, editor) => {
          setValue(newValue);
          setText(editor.getContent({ format: "text" }));
        }}
        onInit={(evt, editor) => {
          setText(editor.getContent({ format: "text" }));
        }}
        initialValue={quiz.description}
        init={{
          plugins:
            "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
        }}
      />
      <br />
      <div className="d-flex align-items-center">
        <p className="me-2">Quiz Type</p>
        <select className="form-control">
          <option value={quiz.type}>{quiz.type}</option>
          <option value="gradedQuiz">Graded Quiz</option>
          <option value="practiceQuiz">Practice Quiz</option>
          <option value="gradedSurvey">Graded Survey</option>
          <option value="unGradedSurvey">Ungraded Survey</option>
        </select>
      </div>
      <br />
      <div className="d-flex align-items-center">
        <p className="me-2">Assignment Group</p>
        <select className="form-control">
          <option value={quiz.assignmentGroup}>{quiz.assignmentGroup}</option>
          <option value="quizzes">Quizzes</option>
          <option value="exams">Exams</option>
          <option value="assignments">Assignments</option>
          <option value="project">Project</option>
        </select>
      </div>
      <br />
      <div>
        <p>
          <strong>Options</strong>
        </p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkbox-shuffle-answers"
            checked={quiz.shuffleAnswers}
          />
          <label
            className="form-check-label"
            htmlFor="checkbox-shuffle-answers"
          >
            Shuffle Answers
          </label>
        </div>
        <br />
        <div className="d-flex">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="checkbox-timeLimit"
              checked={quiz.timeLimit}
            />
            <label className="form-check-label" htmlFor="checkbox-timeLimit">
              Time Limit
            </label>
          </div>
          <input
            type="number"
            className="form-control"
            style={{ width: "100px", marginLeft: "30px", marginRight: "15px" }}
            value={quiz.timeLimit}
          />
          <label style={{ marginLeft: "5px", marginRight: "auto" }}>
            Minutes
          </label>
        </div>
        <br />
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkbox-allow-multiple-attempts"
            checked={quiz.multipleAttemps}
          />
          <label
            className="form-check-label"
            htmlFor="checkbox-alow-multiple-attempts"
          >
            Allow Multiple Attempts
          </label>
        </div>
        <br />
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkbox-show-correct-answers"
            checked={quiz.showCorrectAnswers}
          />
          <label
            className="form-check-label"
            htmlFor="checkbox-show-correct-answers"
          >
            Show Correct Answers
          </label>
        </div>
        <br />
        <div className="d-flex align-items-center">
          <p className="me-2">Access Code</p>
          <input
            type="text"
            className="form-control"
            value={quiz.accessCode}
          ></input>
        </div>
        <br />
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkbox-one-q-at-a-time"
            checked={quiz.oneQuestionAtATime}
          />
          <label
            className="form-check-label"
            htmlFor="checkbox-one-q-at-a-time"
          >
            One Question At A Time
          </label>
        </div>
        <br />
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkbox-webcam-required"
            checked={quiz.webcamRequired}
          />
          <label
            className="form-check-label"
            htmlFor="checkbox-webcam-required"
          >
            Webcam Required
          </label>
        </div>
        <br />
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkbox-lock-questions-after-answering"
            checked={quiz.lockQuestionsAfterAnswering}
          />
          <label
            className="form-check-label"
            htmlFor="checkbox-lock-questions-after-answering"
          >
            Lock Questions After Answering
          </label>
        </div>
        <br />
        <div>
          <p>Assign</p>
          <div>
            <p>
              <strong>Due</strong>
            </p>
            <input
              value={quiz.dueDate}
              className="form-control"
              type="date"
              // onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
            />
            <br />
            <div className="d-flex">
              <div>
                <p>
                  <strong>Available from</strong>
                </p>
                <input
                  value={quiz.avaliableDate}
                  className="form-control"
                  type="date"
                  // onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
                />
              </div>
              <div>
                <p>
                  <strong>Until</strong>
                </p>
                <input
                  value={quiz.untilDate}
                  className="form-control"
                  type="date"
                  // onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
