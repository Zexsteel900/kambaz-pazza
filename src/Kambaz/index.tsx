import { Route, Routes, Navigate } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useEffect, useState } from "react";
// import { db } from "./Database";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as coursesClient from "./Courses/client";
import * as enrollmentsClient from "./Enrollments/client";
import { useDispatch, useSelector } from "react-redux";
import { enroll } from "./Enrollments/reducer";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const dispatch = useDispatch();

  const enrollments = useSelector(
    (state: any) => state.enrollmentsReducer.enrollments
  );

  const enrolledCourses = allCourses.filter((course) =>
    enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === course._id
    )
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const myCourses = await userClient.findMyCourses(); // Enrolled
        const everyCourse = await coursesClient.fetchAllCourses(); // All
        setCourses(myCourses);
        setAllCourses(everyCourse);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);
  const [course, setCourse] = useState<any>({
    name: "New Course",
    number: "New Number",
    image: "/images/reactjs.jpg",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setAllCourses([...allCourses, newCourse]);
    setCourses([...courses, newCourse]); // optional, depends on how you're tracking "my" courses

    if (currentUser?.role === "FACULTY") {
      await enrollmentsClient.enrollInCourse(currentUser._id, newCourse._id);
      dispatch(enroll({ user: currentUser._id, course: newCourse._id })); // ✅ ensures it's added to enrolledCourses
    }
  };
  const deleteCourse = async (courseId: string) => {
    await coursesClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
    setAllCourses(allCourses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await coursesClient.updateCourse(course);
    setCourses(courses.map((c) => (c._id === course._id ? course : c)));
    setAllCourses(allCourses.map((c) => (c._id === course._id ? course : c)));
  };
  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="Account/*" element={<Account />} />
            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={enrolledCourses}
                    allCourses={allCourses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="Courses"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={enrolledCourses}
                    allCourses={allCourses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />

            <Route path="Calendar" element={<h3>Calendar</h3>} />
            <Route path="Inbox" element={<h3>Inbox</h3>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
