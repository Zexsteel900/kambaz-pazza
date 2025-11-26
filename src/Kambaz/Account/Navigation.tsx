import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();

  // Determine which links to show based on user login and role
  const links: string[] = currentUser
    ? ["Profile", ...(currentUser.role === "ADMIN" ? ["Users"] : [])]
    : ["Signin", "Signup"];

  return (
    <ListGroup id="wd-account-navigation" className="wd rounded-0 wd-f-small">
      {links.map((link) => {
        const linkPath = `/Kambaz/Account/${link}`;
        return (
          <ListGroup.Item
            key={link}
            as={Link}
            to={linkPath}
            active={pathname === linkPath}
            className="border-0 text-danger bg-color-white"
            style={{ textDecoration: "none" }}
          >
            {link}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}