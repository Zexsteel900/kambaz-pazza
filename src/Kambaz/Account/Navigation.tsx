import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  return (
    <ListGroup id="wd-account-navigation" className="wd rounded-0 wd-f-small">
      {links.map((link) => (
        <ListGroup.Item
          active={pathname.includes(link)}
          className="border-0 text-danger bg-color-white"
          as={Link}
          to={`/Kambaz/Account/${link}`}
        >
          {link}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
