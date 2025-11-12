import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { enroll, unenroll, setEnrollments } from "./Enrollments/reducer";
import { useEffect, useState } from "react";
import * as enrollmentsClient from "./Enrollments/client";

export default function Dashboard({
  courses,
  allCourses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  allCourses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: string) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector(
    (state: any) => state.enrollmentsReducer.enrollments
  );
  const dispatch = useDispatch();

  if (!currentUser) {
    return null;
  }

  useEffect(() => {
    const fetchEnrollments = async () => {
      const enrolledCourses = await enrollmentsClient.findEnrolledCourses(
        currentUser._id
      );
      const userEnrollments = enrolledCourses.map((course: any) => ({
        user: currentUser._id,
        course: course._id,
      }));
      dispatch(setEnrollments(userEnrollments));
    };

    fetchEnrollments();
  }, [currentUser, dispatch]);

  // Toggle state for showing all courses vs enrolled courses
  const [showAllCourses, setShowAllCourses] = useState(false);

  const isFaculty = currentUser.role === "FACULTY";
  const isStudent = currentUser.role === "STUDENT";

  // Filter courses based on enrollment status
  const displayedCourses = showAllCourses ? allCourses : courses; // Show only enrolled courses

  const isEnrolledIn = (courseId: string) =>
    courses.some((c) => c._id === courseId);

  // Toggle enrollment
  const toggleEnrollment = async (courseId: string) => {
    const isEnrolled = enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === courseId
    );

    if (isEnrolled) {
      await enrollmentsClient.unenrollFromCourse(currentUser._id, courseId);
      dispatch(unenroll({ user: currentUser._id, course: courseId }));
    } else {
      await enrollmentsClient.enrollInCourse(currentUser._id, courseId);
      dispatch(enroll({ user: currentUser._id, course: courseId }));
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {isStudent && (
        <Button
          variant="primary"
          className="float-end me-3"
          onClick={() => setShowAllCourses((prev) => !prev)}
        >
          {showAllCourses ? "Show My Courses" : "Enrollments"}
        </Button>
      )}
      {isFaculty && (
        <>
          <h5>
            New Course{" "}
            <button
              className="btn btn-primary float-end me-2"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course: any) => {
            const isEnrolled = isEnrolledIn(course._id);
            return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card className="h-100 d-flex flex-column">
                  {/*Prevent navigation for unenrolled students */}
                  <Link
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    to={
                      isEnrolled || isFaculty
                        ? `/Kambaz/Courses/${course._id}/Home`
                        : "#"
                    }
                    onClick={(e) => {
                      if (!isEnrolled && isStudent) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {/* <Link
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    to={
                      isEnrolled || isFaculty
                        ? `/Kambaz/Courses/${course._id}/Home`
                        : "#"
                    }
                    onClick={(e) => {
                      if (!isEnrolled && isStudent) {
                        e.preventDefault();
                      }
                    }}
                  > */}
                    <Card.Img
                      variant="top"
                      width="100%"
                      src="/images/reactjs.webp"
                      height={160}
                    />
                    <Card.Body>
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </Card.Title>
                      <hr />
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </Card.Text>
                      {isEnrolled && <Button variant="primary">Go</Button>}
                      {/*Enrollment/Unenrollment Buttons for Students*/}
                      {isStudent && (
                        <Button
                          variant={isEnrolled ? "danger" : "success"}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            toggleEnrollment(course._id);
                          }}
                          className="float-end"
                        >
                          {isEnrolled ? "Unenroll" : "Enroll"}
                        </Button>
                      )}
                      {/* Faculty Specific buttons */}
                      {isFaculty && (
                        <>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning float-end me-2"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
