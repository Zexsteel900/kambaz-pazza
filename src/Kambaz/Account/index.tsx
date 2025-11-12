import { Route, Routes, Navigate } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div id="wd-account-screen" className="d-flex">
      <div className="wd-account-nav wd-padding-right wd-top-padding-20">
        <AccountNavigation />
      </div>
      <div className="wd-account-content flex-grow-1 wd-top-padding-20">
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={
                  currentUser
                    ? "/Kambaz/Account/Profile"
                    : "/Kambaz/Account/Signin"
                }
              />
            }
          />
          <Route path="Signin" element={<Signin />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="Profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
