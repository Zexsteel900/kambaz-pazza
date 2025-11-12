// import React from "react";
import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const [verifyPassword, setVerifyPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signup = async () => {
    if (user.password !== verifyPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kambaz/Account/Profile");
    } catch (err: any) {
      alert("Username already exists");
    }
  };
  return (
    <div id="wd-signup-screen" className="wd-account-component-width">
      <h3>Sign up</h3>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl
        id="wd-password"
        type="password"
        placeholder="password"
        className="mb-2"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <FormControl
        id="wd-password-verify"
        type="password"
        placeholder="verify password"
        className="mb-2"
        onChange={(e) => setVerifyPassword(e.target.value)}
      />
      <Button
        variant="primary"
        size="sm"
        className="w-100 mb-2"
        onClick={signup}
      >
        Sign up
      </Button>
      <Link to="/Kambaz/Account/Signin">Sign in</Link>
    </div>
  );
}
