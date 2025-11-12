import { Button, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import { logoutUser } from "./reducer";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateProfile = async () => {
    const fullProfile = { ...currentUser, ...profile };
    const updatedProfile = await client.updateUser(fullProfile);
    dispatch(setCurrentUser(updatedProfile));
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };
  return (
    <div id="wd-profile-screen" className="wd-account-component-width">
      <h3>Profile</h3>
      {profile && (
        <div>
          <label>
            <b>Username:</b>
          </label>
          <FormControl
            defaultValue={currentUser.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
            placeholder="username"
            className="wd-acc-margin-spacing"
          />
          <label>
            <b>Password:</b>
          </label>
          <FormControl
            defaultValue={currentUser.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
            type="text"
            placeholder="password"
            className="wd-acc-margin-spacing"
          />
          <label>
            <b>First Name:</b>
          </label>
          <FormControl
            defaultValue={currentUser.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
            placeholder="First Name"
            className="wd-acc-margin-spacing"
          />
          <label>
            <b>Last Name:</b>
          </label>
          <FormControl
            defaultValue={currentUser.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
            placeholder="Last Name"
            className="wd-acc-margin-spacing"
          />
          <label>
            <b>Date of Birth:</b>
          </label>
          <FormControl
            defaultValue={currentUser.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            type="date"
            className="wd-acc-margin-spacing"
          />
          <label>
            <b>Email:</b>
          </label>
          <FormControl
            defaultValue={currentUser.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            type="email"
            className="wd-acc-margin-spacing"
          />
          <label>
            <b>Role:</b>
          </label>
          <FormControl
            className="wd-acc-margin-spacing"
            value={currentUser.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            as="select"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </FormControl>
          <Button variant="primary" className="me-2" onClick={updateProfile}>
            Update
          </Button>
          <Button variant="danger" onClick={signout}>
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
