import { useEffect, useState } from "react";
import { Card, Badge, Dropdown} from "react-bootstrap";
import AnswerEditor from "./AnswerEditor";
import Followups from "./Followups";
import client from "../client";
import { useSelector } from "react-redux";
import { format } from "date-fns";

export default function PostView({ post, postId, onRefresh }: any) {
  const [full, setFull] = useState<any>(post || null);
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const isInstructor = currentUser?.role === "FACULTY";
  const isAuthor = full?.author === currentUser?._id;

  useEffect(() => {
    if (post) setFull(post);
  }, [post]);

  useEffect(() => {
    const load = async () => {
      if (postId) {
        try {
          const p = await client.getPost(postId);
          setFull(p);
        } catch (e) {
          console.error("Could not load post by id", e);
          setFull(null);
        }
      }
    };
    load();
  }, [postId]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await client.deletePost(full._id);
      if (onRefresh) await onRefresh();
      window.history.back();
    } catch (e) {
      console.error("Failed to delete post", e);
    }
  };

  if (!full) return null;

  const canEdit = isInstructor || isAuthor;
  const hasStudentAnswers = full.answersStudents?.length > 0;
  const hasInstructorAnswers = full.answersInstructors?.length > 0;

  return (
    <div className="p-4">
      <Card className="pazza-post-view-card">
        <Card.Body>
          {/* Post Header */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <Badge bg={full.postType === "question" ? "primary" : "info"} className="me-2">
                {full.postType === "question" ? "Question" : "Note"}
              </Badge>
              {full.folders?.map((f: string) => (
                <Badge key={f} bg="secondary" className="me-1">
                  {f}
                </Badge>
              ))}
            </div>
            
            {canEdit && (
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" size="sm">
                  Actions
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={handleDelete} className="text-danger">
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>

          {/* Post Title and Content */}
          <Card.Title className="mb-2">{full.summary}</Card.Title>
          
          <Card.Subtitle className="mb-3 text-muted">
            Posted by {full.author || "Unknown"} • {" "}
            {format(new Date(full.createdAt), "MMM d, yyyy 'at' h:mm a")}
          </Card.Subtitle>

          <div 
            className="post-details mb-4" 
            dangerouslySetInnerHTML={{ __html: full.details || "" }} 
          />

          <hr />

          {/* Student Answers Section */}
          {full.postType === "question" && (
            <>
              <h6 className="mb-3">Student's Answers</h6>
              {hasStudentAnswers ? (
                full.answersStudents.map((a: any) => (
                  <Card key={a._id} className="mb-3 pazza-answer-card">
                    <Card.Body>
                      <div dangerouslySetInnerHTML={{ __html: a.text }} />
                      <div className="text-muted small mt-2">
                        {a.author} • {format(new Date(a.createdAt), "MMM d, yyyy")}
                      </div>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p className="text-muted">No student answers yet</p>
              )}

              {/* Allow students to answer if no student answer exists yet */}
              {!isInstructor && !hasStudentAnswers && (
                <AnswerEditor
                  postId={full._id}
                  onPosted={async () => {
                    if (onRefresh) await onRefresh();
                    const refreshed = await client.getPost(full._id);
                    setFull(refreshed);
                  }}
                />
              )}

              <hr />

              {/* Instructor Answers Section */}
              <h6 className="mb-3">Instructor's Answers</h6>
              {hasInstructorAnswers ? (
                full.answersInstructors.map((a: any) => (
                  <Card key={a._id} className="mb-3 pazza-answer-card instructor">
                    <Card.Body>
                      <div dangerouslySetInnerHTML={{ __html: a.text }} />
                      <div className="text-muted small mt-2">
                        {a.author} • {format(new Date(a.createdAt), "MMM d, yyyy")}
                      </div>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p className="text-muted">No instructor answers yet</p>
              )}

              {/* Allow instructors to answer */}
              {isInstructor && (
                <AnswerEditor
                  postId={full._id}
                  onPosted={async () => {
                    if (onRefresh) await onRefresh();
                    const refreshed = await client.getPost(full._id);
                    setFull(refreshed);
                  }}
                />
              )}

              <hr />
            </>
          )}

          {/* Follow-up Discussions */}
          <Followups
            post={full}
            onRefresh={async () => {
              if (onRefresh) await onRefresh();
              const refreshed = await client.getPost(full._id);
              setFull(refreshed);
            }}
          />
        </Card.Body>
      </Card>
    </div>
  );
}