import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function TOC() {
  const { pathname } = useLocation();
  const labs = [
    { label: "Lab 1", path: "/Labs/Lab1", id: "wd-lab1" },
    { label: "Lab 2", path: "/Labs/Lab2", id: "wd-lab2" },
    { label: "Lab 3", path: "/Labs/Lab3", id: "wd-lab3" },
    { label: "Lab 4", path: "/Labs/Lab4", id: "wd-lab4" },
    { label: "Lab 5", path: "/Labs/Lab5", id: "wd-lab5" },
  ];
  return (
    <Nav variant="pills" id="wd-toc">
      <Nav.Item className="nav nav-pills">
        {labs.map((lab) => (
          <Nav.Link
            key={lab.id}
            as={Link}
            to={lab.path}
            id={lab.id}
            active={pathname == lab.path}
          >
            {lab.label}
          </Nav.Link>
        ))}
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="https://github.com/sychan91/kambaz-react-web-app-cs5610-sp25/tree/main"
          active={false}
        >
          React Github Repo
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="https://github.com/sychan91/kambaz-node-server-app.git"
          active={false}
        >
          Server Github Repo
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="https://kambaz-node-server-app-vx2e.onrender.com"
          active={false}
        >
          Server Root
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Kambaz" id="wd-k">
          Kambaz
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
