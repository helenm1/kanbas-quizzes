import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion, updateQuestion } from "../reducer";
import * as questionsClient from "../client";
import { useEffect, useState } from "react";
import { KanbasState } from "../../../../../store";
import { Question } from "../client";
import { useParams } from "react-router-dom";

function TFEditor(props: any) {
  const { courseId } = useParams();
  const { quizId } = useParams();
  // console.log("params:", useParams());
  // console.log("question a tbeg", question);
  const validatedQuizId = quizId ? quizId : "";

  const validatedCourseId = courseId ? courseId : "";
  const validatedQuestionId = props.question._id ?? "";

  const [text, setText] = useState("");
  const [value, setValue] = useState("<p>TinyMCE editor text</p>");
  const dispatch = useDispatch();

  // let question = useSelector(
  //   (state: KanbasState) => state.questionsReducer.question
  // );

  const fetchQuestion = async () => {
    await questionsClient.findQuestionById(
      validatedCourseId,
      validatedQuizId,
      validatedQuestionId
    );
    // dispatch(setQuestion(question));
  };

  const [question, setQuestion] = useState(props.question);
  console.log("questiontext", question.questionText);

  // const validatedQuestionId = question.id ? question.id : "";

  const handleUpdateQuestion = async (question: Question) => {
    // console.log("Question", question);
    // console.log("Question id in update", question._id);
    // const validatedQuestionId = question._id ? question._id : "";
    await questionsClient.updateQuestion(
      validatedCourseId,
      validatedQuizId,
      validatedQuestionId,
      question
    );

    dispatch(updateQuestion(question));
    fetchQuestion();
  };

  useEffect(() => {
    fetchQuestion();
    setQuestion(props.question);
  }, [props.question]);

  return (
    <div>
      <p>
        Enter your question text, then select if True or False is the correct
        answer.
      </p>
      <h6>Question:</h6>
      <Editor
        apiKey="zlv0ljcd3b15hbahhzsxkdl856ug1hlqcfffxhtdwpwi12h2"
        onEditorChange={(newValue, editor) => {
          setValue(newValue);
          setText(editor.getContent({ format: "text" }));
          // dispatch(setQuestion({ ...question, questionText: newValue }));
        }}
        onInit={(evt, editor) => {
          setText(editor.getContent({ format: "text" }));
        }}
        initialValue={question.questionText}
        // value={question.questionText}
        init={{
          plugins:
            "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
        }}
      />

      <div>
        <input
          type="radio"
          id="true"
          name="answer"
          checked={question.tfAnswer}
          onChange={(e) =>
            setQuestion({ ...question, answer: e.target.checked })
          }
        />
        <label htmlFor="true">True</label>
      </div>
      <div>
        <input
          type="radio"
          id="false"
          name="answer"
          checked={question.tfAnswer}
          onChange={(e) =>
            setQuestion({ ...question, answer: e.target.checked })
          }
        />
        <label htmlFor="false">False</label>
      </div>
      {/* <button
        className="btn btn-light"
        onClick={() => handleUpdateQuestion(question)}
      >
        Update TF Question
      </button> */}
    </div>
  );
}
export default TFEditor;
