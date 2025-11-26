"use client";

import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import PeopleTable from "../../Courses/People/Table";
import PeopleDetails from "../../Courses/People/Details";
import * as client from "../client";
import { FormControl } from "react-bootstrap";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // ----------------------
  // Fetch all users
  // ----------------------
  const fetchUsers = async () => {
    try {
      const allUsers = await client.findAllUsers();
      const validUsers = allUsers.filter((u: any) => u.username && u.username.trim() !== "");
      setUsers(validUsers);
      return validUsers;
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // ----------------------
  // Filter users by role
  // ----------------------
  const filterUsersByRole = async (selectedRole: string) => {
    setRole(selectedRole);
    if (selectedRole) {
      try {
        const filteredUsers = await client.findUsersByRole(selectedRole);
        setUsers(filteredUsers);
      } catch (err) {
        console.error("Error filtering users by role:", err);
      }
    } else {
      fetchUsers();
    }
  };

  // ----------------------
  // Filter users by name
  // ----------------------
  const filterUsersByName = async (searchName: string) => {
    setName(searchName);
    if (searchName) {
      try {
        const filteredUsers = await client.findUsersByPartialName(searchName);
        setUsers(filteredUsers);
      } catch (err) {
        console.error("Error filtering users by name:", err);
      }
    } else {
      fetchUsers();
    }
  };

  // ----------------------
  // Create a new user
  // ----------------------
  const createUser = async () => {
    try {
      const user = await client.createUser({
        firstName: "New",
        lastName: `User${users.length + 1}`,
        username: `newuser${Date.now()}`,
        password: "password123",
        email: `email${Date.now()}@neu.edu`,
        section: "S101",
        role: "STUDENT",
      });

      setUsers([...users, user]);
    } catch (err: any) {
      console.error("Failed to create user:", err);
      alert(err?.response?.data?.message || err.message);
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Users</h3>

      {/* Filters */}
      <div className="d-flex mb-3">
        <select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select w-25 me-2"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>

        <FormControl
          type="text"
          placeholder="Search people"
          value={name}
          onChange={(e) => filterUsersByName(e.target.value)}
          className="w-25"
        />

        {/* Create User button */}
        <button
          onClick={createUser}
          className="float-end btn btn-danger wd-add-people ms-auto"
        >
          <FaPlus className="me-2" />
          Users
        </button>
      </div>

      {/* Users Table */}
      <PeopleTable
        users={users}
        fetchUsers={fetchUsers}
        onSelectUser={setSelectedUserId}
      />

      {/* User Details Panel */}
      {selectedUserId && (
        <PeopleDetails
          uid={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}