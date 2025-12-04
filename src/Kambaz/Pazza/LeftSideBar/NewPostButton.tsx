import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function NewPostButton() {
  const nav = useNavigate();
  const { cid } = useParams();

  return (
    <Button 
      variant="primary" 
      className="w-100"
      onClick={() => nav(`/Kambaz/Courses/${cid}/Pazza/new`)}
    >
      New Post
    </Button>
  );
}