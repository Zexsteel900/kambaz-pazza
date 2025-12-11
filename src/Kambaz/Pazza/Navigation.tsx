import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Navigation() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const isInstructor = currentUser?.role === "FACULTY";

  const basePath = `/Kambaz/Courses/${cid}/Pazza`;
  const isManageActive = location.pathname.includes(`${basePath}/manage`);
  const isQAActive = !location.pathname.includes("/new") && !isManageActive;

  return (
    <Navbar bg="light" expand="lg" className="pazza-navbar shadow-sm">
      <div className="container-fluid px-3">
        <Navbar.Brand 
          style={{ fontWeight: 700, fontSize: "1.5rem", color: "#dc3545" }}
          className="me-4"
        >
          pazza
        </Navbar.Brand>

        <Navbar.Text className="me-3 text-muted">
          {cid || "—"}
        </Navbar.Text>

        <Nav className="me-auto">
          <Nav.Link 
            onClick={() => navigate(basePath)}
            active={isQAActive}
            style={{ fontWeight: isQAActive ? 600 : 400 }}
          >
            Q&A
          </Nav.Link>
          <Nav.Link disabled className="text-muted">Resources</Nav.Link>
          <Nav.Link disabled className="text-muted">Statistics</Nav.Link>
          {isInstructor && (
            <Nav.Link 
              onClick={() => navigate(`${basePath}/manage/folders`)}
              active={isManageActive}
              style={{ fontWeight: isManageActive ? 600 : 400 }}
            >
              Manage Class
            </Nav.Link>
          )}
        </Nav>

        <Navbar.Text className="ms-auto">
          {currentUser 
            ? `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim() || currentUser.username 
            : "Guest"}
        </Navbar.Text>
      </div>
    </Navbar>
  );
}
