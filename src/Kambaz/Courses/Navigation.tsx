import { ListGroup } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";

export default function CoursesNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const links = [
    "Home",
    "Modules",
    "Pazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  return (
    <ListGroup id="wd-courses-navigation" className="wd rounded-0 wd-f-small">
      {links.map((link) => (
        <ListGroup.Item
          key={link}
          active={pathname.includes(link)}
          className="border-0 text-danger bg-color-white"
          as={Link}
          to={`/Kambaz/Courses/${cid}/${link}`}
        >
          {link}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
