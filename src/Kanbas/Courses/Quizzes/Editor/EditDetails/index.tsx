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
    </div>
  );
}
