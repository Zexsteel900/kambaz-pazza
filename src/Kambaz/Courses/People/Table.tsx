"use client";

import { Table } from "react-bootstrap";
import { FaTrash, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username?: string;
  loginId?: string;
  section?: string;
  role: "ADMIN" | "FACULTY" | "STUDENT" | string;
  lastActivity?: string;
  totalActivity?: string | number;
}

interface PeopleTableProps {
  users?: User[];
  fetchUsers?: () => Promise<User[]>;
  onSelectUser?: (uid: string) => void;
}

export default function PeopleTable({
  users: initialUsers = [],
  fetchUsers,
  onSelectUser,
}: PeopleTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const { currentUser } = useSelector(
    (state: { accountReducer: { currentUser?: User } }) => state.accountReducer
  );

  useEffect(() => {
  const loadUsers = async () => {
    if (fetchUsers) {
      const result = await fetchUsers();
      setUsers(result);
    } else {
      // Filter initialUsers too just in case
      const validInitialUsers = initialUsers.filter(
        (u) => u.username && u.username.trim() !== ""
      );
      setUsers(validInitialUsers);
    }
  };
  loadUsers();
}, [initialUsers, fetchUsers]);

  const handleDeleteUser = async (uid: string) => {
    if (!currentUser || currentUser.role !== "ADMIN") return;

    await fetch(`/api/users/${uid}`, { method: "DELETE" });
    setUsers(users.filter((u) => u._id !== uid));
    if (fetchUsers) await fetchUsers(); // refresh parent list
  };

  if (!users || users.length === 0) {
    return <div>No users to display</div>;
  }

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
          {users.map((user) => {
            // Skip user if firstName is blank
            if (!user.firstName || user.firstName.trim() === "") return null;

            return (
              <tr key={user._id}>
                <td
                  className="wd-full-name text-nowrap"
                  style={{ cursor: onSelectUser ? "pointer" : "default" }}
                  onClick={() => onSelectUser?.(user._id)}
                >
                  <FaUserCircle className="me-2 fs-2 text-secondary" />
                  <span className="wd-first-name text-danger wd-f-small">
                    {user.firstName}
                  </span>{" "}
                  <span className="wd-last-name text-danger wd-f-small">
                    {user.lastName}
                  </span>
                </td>
                <td className="wd-login-id wd-f-small">{user.loginId || user.username}</td>
                <td className="wd-section wd-f-small">{user.section || "-"}</td>
                <td className="wd-role wd-f-small">{user.role}</td>
                <td className="wd-last-activity wd-f-small">{user.lastActivity || "-"}</td>
                <td className="wd-total-activity wd-f-small">{user.totalActivity || "-"}</td>
                <td>
                  {currentUser?.role === "ADMIN" && (
                    <button
                      className="btn btn-danger float-end me-2"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
