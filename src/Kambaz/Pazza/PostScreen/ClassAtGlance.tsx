import { useMemo } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";

interface ClassAtGlanceProps {
  posts: any[];
}

export default function ClassAtGlance({ posts }: ClassAtGlanceProps) {
  const stats = useMemo(() => {
    const total = posts.length;
    const unanswered = posts.filter(
      (p) =>
        (!p.answersInstructors || p.answersInstructors.length === 0) &&
        (!p.answersStudents || p.answersStudents.length === 0)
    ).length;

    const instructorResponses = posts.reduce(
      (sum, p) => sum + (p.answersInstructors?.length || 0),
      0
    );

    const studentResponses = posts.reduce(
      (sum, p) => sum + (p.answersStudents?.length || 0),
      0
    );

    return {
      total,
      unanswered,
      instructorResponses,
      studentResponses,
    };
  }, [posts]);

  return (
    <div className="p-4">
      <Card>
        <Card.Body>
          <Card.Title>Class at a Glance</Card.Title>
          <hr />
          
          <Row className="g-3">
            <Col md={6}>
              <div className="p-3 border rounded">
                <h6 className="text-muted">Unread Posts</h6>
                <h3>{stats.unanswered > 0 ? stats.unanswered : "No unread posts"}</h3>
              </div>
            </Col>
            
            <Col md={6}>
              <div className="p-3 border rounded">
                <h6 className="text-muted">Unanswered Posts</h6>
                <h3>{stats.unanswered > 0 ? stats.unanswered : "No unanswered posts"}</h3>
              </div>
            </Col>
            
            <Col md={6}>
              <div className="p-3 border rounded">
                <h6 className="text-muted">Total Posts</h6>
                <h3><Badge bg="primary">{stats.total}</Badge></h3>
              </div>
            </Col>
            
            <Col md={6}>
              <div className="p-3 border rounded">
                <h6 className="text-muted">Instructor Responses</h6>
                <h3><Badge bg="success">{stats.instructorResponses}</Badge></h3>
              </div>
            </Col>
            
            <Col md={6}>
              <div className="p-3 border rounded">
                <h6 className="text-muted">Student Responses</h6>
                <h3><Badge bg="info">{stats.studentResponses}</Badge></h3>
              </div>
            </Col>
            
            <Col md={6}>
              <div className="p-3 border rounded">
                <h6 className="text-muted">Students Enrolled</h6>
                <h3><Badge bg="secondary">—</Badge></h3>
              </div>
            </Col>
          </Row>

          <div className="mt-4 text-center text-muted">
            <p>Select a post from the sidebar to view details</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}