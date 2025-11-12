import { Button, ListGroup, Modal } from "react-bootstrap";
import AssignmentControls from "./AssignmentControls";
import { BsGripVertical } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { Link, useParams } from "react-router-dom";
import { IoEllipsisVertical } from "react-icons/io5";
import { TfiPlus } from "react-icons/tfi";
// import { db } from "../../Database";
import { useSelector, useDispatch } from "react-redux";
import { FaTrashCan } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { deleteAssignment, setAssignments } from "./reducer";
import * as assignmentsClient from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  const isFaculty = currentUser.role === "FACULTY";

  const fetchAssignments = async () => {
    const serverAssignments = await assignmentsClient.findAssignmentsForCourse(
      cid as string
    );
    dispatch(setAssignments(serverAssignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, [currentUser]);

  // useEffect(() => {
  //   const fetchAssignments = async () => {
  //     const serverAssignments =
  //       await assignmentsClient.findAssignmentsForCourse(cid as string);
  //     dispatch(setAssignments(serverAssignments));
  //   };
  //   if (cid) {
  //     fetchAssignments();
  //   }
  // }, [cid]);

  const assignments = useSelector((state: any) =>
    state.assignments?.assignments?.filter((a: any) => a.course === cid)
  );

  const confirmDelete = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  const handleDelete = async (_id: any) => {
    if (selectedAssignment) {
      await assignmentsClient.deleteAssignment(selectedAssignment._id);
      dispatch(deleteAssignment(selectedAssignment._id));
    }
    setShowModal(false);
    setSelectedAssignment(null);
  };
  return (
    <div id="wd-assignments">
      <div className="wd-module-control-padding">
        <AssignmentControls />
      </div>
      <ListGroup className="rounded-0 wd-assignment-padding">
        <ListGroup.Item className="wd-module p-0 mb-5 wd-f-small fw-semibold border-gray">
          <div className="d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary">
            <span className="fw-bold">ASSIGNMENTS</span>
            <div className="d-flex align-items-center">
              <div
                className="rounded-pill px-3 py-1 bg-secondary border wd-thin-black-border me-3"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "480",
                }}
              >
                40% of Total
              </div>
              <TfiPlus className="fs-6 me-2" />
              <IoEllipsisVertical className="fs-6" />
            </div>
          </div>
          <ListGroup className="wd-assignments rounded-0">
            {assignments.map((assignment: any) => (
              <ListGroup.Item
                key={assignment._id}
                className="wd-assignment p-3 d-flex align-items-center wd-lesson"
              >
                <div className="d-flex align-items-center me-3">
                  <BsGripVertical className="fs-5 me-2" />
                  <LuNotebookPen className="fs-6" />
                </div>

                <div className="assignment-text">
                  <span>
                    {isFaculty ? (
                      <Link
                        to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                        className="fw-bold text-black text-decoration-none"
                      >
                        {assignment.title}
                      </Link>
                    ) : (
                      <span className="fw-bold">{assignment.title}</span>
                    )}
                    <br />
                    <span className="wd-assignment-f-small">
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <b>Not available until</b> {assignment.availableUntil} at{" "}
                      {assignment.availableTime}
                    </span>
                    <br />
                    <span className="wd-assignment-f-small">
                      <b>Due</b> {assignment.dueDate} at {assignment.dueTime} |{" "}
                      {assignment.points}pts
                    </span>
                  </span>
                </div>

                <div className="ms-auto">
                  {isFaculty && (
                    <>
                      <FaTrashCan
                        className="text-danger me-2 mb-1 fs-6"
                        onClick={() => confirmDelete(assignment)}
                        style={{ cursor: "pointer" }}
                      />
                    </>
                  )}
                  <LessonControlButtons />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
