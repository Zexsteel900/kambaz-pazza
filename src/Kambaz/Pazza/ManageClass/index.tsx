import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import ManageFolders from "./ManageFolders";
import { Nav } from "react-bootstrap";

export default function ManageClass() {
  const location = useLocation();

  return (
    <div className="container mt-5 pt-5">
      <div className="p-4 bg-white rounded shadow-sm">
        <h4 className="mb-4">Manage Class</h4>
        
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link 
              as={Link} 
              to="folders"
              active={location.pathname.includes("folders")}
            >
              Manage Folders
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled>Settings</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled>Permissions</Nav.Link>
          </Nav.Item>
        </Nav>

        <Routes>
          <Route path="folders" element={<ManageFolders />} />
          <Route path="/" element={<ManageFolders />} />
        </Routes>
      </div>
    </div>
  );
}