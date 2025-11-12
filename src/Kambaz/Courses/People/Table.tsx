import { Table } from "react-bootstrap";
import { FaTrash, FaUserCircle } from "react-icons/fa";
// import { db } from "../../Database";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as userClient from "../../Users/client";
import { useSelector } from "react-redux";

export default function PeopleTable() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await userClient.findUsersInCourse(cid!);
      setUsers(result);
    };
    if (cid) fetchUsers();
  }, [cid]);

  // const { users, enrollments } = db;

  const handleDeleteUser = async (uid: string) => {
    await userClient.deleteUser(uid);
    setUsers(users.filter((user) => user._id !== uid));
  };

  return (
    <div id="wd-people-table">
      <Table striped className="wd-f-small">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-2 text-secondary" />
                <span className="wd-first-name text-danger wd-f-small">
                  {user.firstName}
                </span>{" "}
                <span className="wd-last-name text-danger wd-f-small">
                  {user.lastName}
                </span>
              </td>
              <td className="wd-login-id wd-f-small">{user.loginId}</td>
              <td className="wd-section wd-f-small">{user.section}</td>
              <td className="wd-role wd-f-small">{user.role}</td>
              <td className="wd-last-activity wd-f-small">
                {user.lastActivity}
              </td>
              <td className="wd-total-activity wd-f-small">
                {user.totalActivity}
              </td>
              <td>
                {currentUser?.role === "FACULTY" && (
                  <button
                    className="btn btn-danger float-end me-2"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <FaTrash />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
