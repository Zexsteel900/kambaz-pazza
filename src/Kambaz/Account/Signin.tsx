import { Button, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
// import { db } from "../Database";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    const user = await client.signin(credentials);
    if (user) {
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Dashboard");
    } else {
      alert("Invalid username or password");
    }
  };
  return (
    <div id="wd-signin-screen" className="wd-account-component-width">
      <h3>Sign in</h3>
      <FormControl
        id="wd-username"
        defaultValue={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        placeholder="username"
        className="mb-2"
      />
      <FormControl
        id="wd-password"
        defaultValue={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <Button
        onClick={signin}
        variant="primary"
        size="sm"
        className="w-100 mb-2"
      >
        Sign in
      </Button>
      <Link to="/Kambaz/Account/Signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}

<Link to="/Kambaz/Account/Signup" id="wd-signup-link">
  Sign up
</Link>;
