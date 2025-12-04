import React, { useState } from "react";
import { Button, Card, FormControl } from "react-bootstrap";
import client from "../client";
import { format } from "date-fns";

export default function Followups({ post, onRefresh }: any) {
  const [text, setText] = useState("");
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});

  const addFollowup = async () => {
    if (!text.trim()) return alert("Cannot add empty followup");
    try {
      await client.postFollowup(post._id, text);
      setText("");
      onRefresh();
    } catch (e) {
      console.error("Failed to add followup", e);
      alert("Failed to add followup");
    }
  };

  const addReply = async (followupId: string) => {
    const replyText = replyTexts[followupId];
    if (!replyText || !replyText.trim()) return alert("Cannot add empty reply");
    try {
      await client.postReply(post._id, followupId, replyText);
      setReplyTexts({ ...replyTexts, [followupId]: "" });
      onRefresh();
    } catch (e) {
      console.error("Failed to add reply", e);
      alert("Failed to add reply");
    }
  };

  return (
    <div className="mt-3">
      <h6>Follow up Discussion</h6>
      <div>
        {(post.followups || []).map((f: any) => (
          <Card key={f._id} className="mb-3 pazza-followup">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <strong>{f.author}</strong>
                  <span className="text-muted small ms-2">
                    {format(new Date(f.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant={f.resolved ? "success" : "outline-secondary"}
                >
                  {f.resolved ? "Resolved" : "Unresolved"}
                </Button>
              </div>
              <div dangerouslySetInnerHTML={{ __html: f.text }} />
              
              {/* Replies */}
              {(f.replies || []).map((r: any) => (
                <div key={r._id} className="pazza-followup-reply mt-2">
                  <div>
                    <strong>{r.author}</strong>
                    <span className="text-muted small ms-2">
                      {format(new Date(r.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: r.text }} />
                </div>
              ))}

              {/* Reply Input */}
              <div className="mt-3">
                <FormControl
                  as="textarea"
                  rows={2}
                  placeholder="Reply to this discussion..."
                  value={replyTexts[f._id] || ""}
                  onChange={(e) => setReplyTexts({ ...replyTexts, [f._id]: e.target.value })}
                />
                <Button 
                  size="sm" 
                  className="mt-2"
                  onClick={() => addReply(f._id)}
                >
                  Reply
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* New Followup */}
      <div className="mt-3">
        <FormControl 
          as="textarea" 
          rows={3} 
          placeholder="Start a new followup discussion..." 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        />
        <div className="mt-2 d-flex justify-content-end">
          <Button size="sm" onClick={addFollowup}>Add Followup</Button>
        </div>
      </div>
    </div>
  );
}