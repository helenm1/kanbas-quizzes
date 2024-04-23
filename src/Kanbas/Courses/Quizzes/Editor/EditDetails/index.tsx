import { Link, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import EditQuestions from "../EditQuestions";
import { useParams } from "react-router-dom";
import * as quizzesClient from "../../client";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { setQuiz, setQuizzes, updateQuiz } from "../../reducer";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./index.css";
import { Quiz } from "../../client";

export default function EditDetails() {
  const { courseId, quizId } = useParams();
  const validatedCourseId = courseId ? courseId : "";
  const [text, setText] = useState("");
  const [value, setValue] = useState("<p>TinyMCE editor text</p>");

  let quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const dispatch = useDispatch();

  const fetchQuiz = async () => {
    const quiz = await quizzesClient.fetchQuizById(validatedCourseId, quizId);
    dispatch(setQuiz(quiz));
  };

  const handleUpdateQuiz = async (quiz: Quiz) => {
    await quizzesClient.updateQuiz(validatedCourseId, quiz);
    dispatch(updateQuiz(quiz));
    fetchQuiz();
  };

  const navigate = useNavigate();
  const goToQuizDetails = () => {
    navigate(`../Quizzes/${quizId}`);
  };
  const goToQuizList = () => {
    navigate(`../Quizzes`);
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
        onChange={(e) => dispatch(setQuiz({ ...quiz, name: e.target.value }))}
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
          dispatch(setQuiz({ ...quiz, description: newValue }));
        }}
        onInit={(evt, editor) => {
          setText(editor.getContent({ format: "text" }));
        }}
        // initialValue={quiz.description}
        value={quiz.description}
        init={{
          plugins:
            "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
        }}
      />
      <br />
      <div className="d-flex align-items-center">
        <p className="me-2">Quiz Type</p>
        <select
          className="form-control"
          value={quiz.quizType}
          onChange={(e) =>
            dispatch(setQuiz({ ...quiz, quizType: e.target.value }))
          }
        >
          <option value="GRADED_QUIZ">Graded Quiz</option>
          <option value="PRACTICE_QUIZ">Practice Quiz</option>
          <option value="GRADED_SURVEY">Graded Survey</option>
          <option value="UNGRADED_SURVEY">Ungraded Survey</option>
        </select>
      </div>
      <br />
      <div className="d-flex align-items-center">
        <p className="me-2">Assignment Group</p>
        <select
          className="form-control"
          value={quiz.assignmentGroup}
          onChange={(e) =>
            dispatch(setQuiz({ ...quiz, assignmentGroup: e.target.value }))
          }
        >
          <option value="QUIZZES">Quizzes</option>
          <option value="EXAMS">Exams</option>
          <option value="ASSIGNMENTS">Assignments</option>
          <option value="PROJECT">Project</option>
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
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, shuffleAnswers: e.target.checked }))
            }
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
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, timeLimit: e.target.checked }))
              }
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
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, timeLimit: e.target.value }))
            }
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
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, multipleAttemps: e.target.checked }))
            }
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
            onChange={(e) =>
              dispatch(
                setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })
              )
            }
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
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, accessCode: e.target.value }))
            }
          ></input>
        </div>
        <br />
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkbox-one-q-at-a-time"
            checked={quiz.oneQuestionAtATime}
            onChange={(e) =>
              dispatch(
                setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
              )
            }
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
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, webcamRequired: e.target.checked }))
            }
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
            onChange={(e) =>
              dispatch(
                setQuiz({
                  ...quiz,
                  lockQuestionsAfterAnswering: e.target.checked,
                })
              )
            }
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
              onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
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
                  onChange={(e) =>
                    setQuiz({ ...quiz, avaliableDate: e.target.value })
                  }
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
                  onChange={(e) =>
                    setQuiz({ ...quiz, untilDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-light" onClick={goToQuizDetails}>
          Cancel
        </button>
        <button
          className="btn btn-light"
          onClick={(event) => {
            event.preventDefault();
            dispatch(
              setQuiz({
                ...quiz,
                published: true,
              })
            );
            handleUpdateQuiz(quiz);
            goToQuizList();
          }}
        >
          Save & Publish
        </button>
        <button
          className="btn btn-danger"
          onClick={(event) => {
            event.preventDefault();
            handleUpdateQuiz(quiz);
          }}
        >
          Save
        </button>
      </div>
      <br />
    </div>
  );
}
