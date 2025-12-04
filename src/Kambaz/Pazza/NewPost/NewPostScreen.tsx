import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormControl, Form, ButtonGroup, Alert } from "react-bootstrap";
import ReactQuill from "react-quill";
import client from "../client";
import "react-quill/dist/quill.snow.css";

export default function NewPostScreen() {
  const { cid } = useParams();
  const nav = useNavigate();
  const [type, setType] = useState<"question" | "note">("question");
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [folders, setFolders] = useState<string[]>([]);
  const [availableFolders, setAvailableFolders] = useState<any[]>([]);
  const [postTo, setPostTo] = useState<"entire" | "individual">("entire");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!cid) return;
    client.getFolders(cid).then((f) => setAvailableFolders(f));
  }, [cid]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!summary.trim()) {
      newErrors.summary = "Summary is required";
    }
    
    if (!details.trim() || details === "<p><br></p>") {
      newErrors.details = "Details are required";
    }
    
    if (folders.length === 0) {
      newErrors.folders = "Select at least one folder";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    try {
      await client.createPost(cid || "current", {
        postType: type,
        summary,
        details,
        folders,
        visibility: {
          entireClass: postTo === "entire",
          allowedUsers: postTo === "individual" ? selectedUsers : [],
        },
      });
      nav(`/Kambaz/Courses/${cid}/Pazza`);
    } catch (e) {
      console.error("Failed to create post", e);
      alert("Failed to create post");
    }
  };

  const toggleFolder = (folderName: string) => {
    if (folders.includes(folderName)) {
      setFolders(folders.filter((x) => x !== folderName));
    } else {
      setFolders([...folders, folderName]);
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="p-4 bg-white rounded shadow-sm">
        <h4 className="mb-4">New Post</h4>

        {/* Post Type Tabs */}
        <ButtonGroup className="mb-3 w-100">
          <Button 
            variant={type === "question" ? "primary" : "outline-primary"}
            onClick={() => setType("question")}
          >
            Question
          </Button>
          <Button 
            variant={type === "note" ? "primary" : "outline-primary"}
            onClick={() => setType("note")}
          >
            Note
          </Button>
          <Button variant="outline-secondary" disabled>
            Poll/In-Class Response
          </Button>
        </ButtonGroup>

        {/* Post To */}
        <Form.Group className="mb-3">
          <Form.Label><strong>Post To</strong></Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="Entire Class"
              checked={postTo === "entire"}
              onChange={() => setPostTo("entire")}
              id="post-to-entire"
            />
            <Form.Check
              type="radio"
              label="Individual Students/Instructors"
              checked={postTo === "individual"}
              onChange={() => setPostTo("individual")}
              id="post-to-individual"
            />
          </div>
        </Form.Group>

        {/* Folders Selection */}
        <Form.Group className="mb-3">
          <Form.Label><strong>Select Folders</strong> (at least one required)</Form.Label>
          {errors.folders && <Alert variant="danger" className="py-1">{errors.folders}</Alert>}
          <div className="d-flex flex-wrap gap-2">
            {availableFolders.map((f: any) => (
              <Button
                key={f._id}
                size="sm"
                variant={folders.includes(f.name) ? "secondary" : "outline-secondary"}
                onClick={() => toggleFolder(f.name)}
              >
                {f.name}
              </Button>
            ))}
          </div>
        </Form.Group>

        {/* Summary */}
        <Form.Group className="mb-3">
          <Form.Label><strong>Summary</strong> (max 100 characters)</Form.Label>
          {errors.summary && <Alert variant="danger" className="py-1">{errors.summary}</Alert>}
          <FormControl
            placeholder="Enter a brief summary..."
            value={summary}
            onChange={(e) => setSummary(e.target.value.slice(0, 100))}
            isInvalid={!!errors.summary}
          />
          <Form.Text className="text-muted">
            {summary.length}/100 characters
          </Form.Text>
        </Form.Group>

        {/* Details (Rich Text Editor) */}
        <Form.Group className="mb-3">
          <Form.Label><strong>Details</strong></Form.Label>
          {errors.details && <Alert variant="danger" className="py-1">{errors.details}</Alert>}
          <ReactQuill 
            value={details} 
            onChange={setDetails}
            theme="snow"
            placeholder="Provide detailed information..."
          />
        </Form.Group>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="secondary" onClick={() => nav(-1)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submit}>
            Post My {type === "question" ? "Question" : "Note"}
          </Button>
        </div>
      </div>
    </div>
  );
}