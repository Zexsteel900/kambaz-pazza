import { Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Layout from "./Layout";
import NewPostScreen from "./NewPost/NewPostScreen";
import ManageClass from "./ManageClass";
import { useSelector } from "react-redux";
import "./pazza.css";

export default function PazzaWrapper() {
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const isInstructor = currentUser?.role === "FACULTY";

  return (
    <div id="wd-pazza" className="pazza-wrapper">
      <Navigation />
      <div className="pazza-content-wrapper">
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="post/:pid" element={<Layout />} />
          <Route path="new" element={<NewPostScreen />} />
          {isInstructor && <Route path="manage/*" element={<ManageClass />} />}
        </Routes>
      </div>
    </div>
  );
}