import { useState } from "react";
import { Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import client from "../client";
import "react-quill/dist/quill.snow.css";

type AnswerEditorProps = {
  postId: string;
  onPosted: () => void;
};

export default function AnswerEditor({ postId, onPosted }: AnswerEditorProps) {
  const [text, setText] = useState("");

  const submit = async () => {
    if (!text || text.trim() === "" || text === "<p><br></p>") {
      alert("Answer cannot be empty");
      return;
    }
    try {
      await client.postAnswer(postId, text);
      setText("");
      onPosted();
    } catch (e) {
      console.error("Failed to post answer", e);
      alert("Failed to post answer");
    }
  };

  return (
    <div className="mt-3">
      <label><b>Your Answer</b></label>
      <ReactQuill value={text} onChange={setText} theme="snow" />
      <div className="mt-2 d-flex justify-content-end">
        <Button size="sm" onClick={submit}>Post Answer</Button>
      </div>
    </div>
  );
}