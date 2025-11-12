import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { GoBeaker } from "react-icons/go";
import { BsEnvelopePaper } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuBookText } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

export default function KambazNavigation() {
  const { pathname } = useLocation();
  const links = [
    {
      label: "Dashboard",
      path: "/Kambaz/Dashboard",
      icon: IoSpeedometerOutline,
      id: "wd-dashboard-link",
    },
    {
      label: "Courses",
      path: "/Kambaz/Courses",
      icon: LuBookText,
      id: "wd-courses-link",
    },
    {
      label: "Calendar",
      path: "/Kambaz/Calendar",
      icon: FaRegCalendarAlt,
      id: "wd-calendar-link",
    },
    {
      label: "Inbox",
      path: "/Kambaz/Inbox",
      icon: BsEnvelopePaper,
      id: "wd-inbox-link",
    },
    {
      label: "Labs",
      path: "/Labs",
      icon: GoBeaker,
      id: "wd-labs-link",
    },
  ];
  return (
    <ListGroup
      style={{ width: 75 }}
      id="wd-kambaz-navigation"
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroup.Item
        action
        href="https://northeastern.edu/"
        id="wd-neu-link"
        target="_blank"
        className="border-0 bg-black text-danger text-center wd-f-very-small wd-center"
      >
        <img src="/images/neulogo-2.png" className="wd-logo-sm" />
      </ListGroup.Item>

      <ListGroup.Item
        as={Link}
        to="/Kambaz/Account"
        id="wd-account-link"
        className={`border-0 text-center wd-f-very-small ${
          pathname.includes("Account")
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <MdAccountCircle className="wd-icon-lg" />
        <br />
        Account
      </ListGroup.Item>
      {links.map((link) => (
        <ListGroup.Item
          key={link.id}
          as={Link}
          to={link.path}
          id={link.id}
          className={`border-0 text-center wd-f-very-small ${
            pathname.includes(link.path)
              ? "bg-white text-danger"
              : "bg-black text-white"
          }`}
        >
          <link.icon className="wd-icon-red wd-icon-md" />
          <br />

          {link.label}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
