import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import client from "./client";

interface FoldersBarProps {
  selectedFolder: string;
  onFolderSelect: (folder: string) => void;
}

export default function FoldersBar({ selectedFolder, onFolderSelect }: FoldersBarProps) {
  const { cid } = useParams();
  const [folders, setFolders] = useState<any[]>([]);

  useEffect(() => {
    const loadFolders = async () => {
      if (!cid) return;
      try {
        const data = await client.getFolders(cid);
        setFolders(data);
      } catch (e) {
        console.error("Failed to load folders", e);
      }
    };
    loadFolders();
  }, [cid]);

  return (
    <div className="pazza-folders-bar bg-white border-bottom">
      <div className="d-flex align-items-center px-3 py-2">
        <Nav variant="pills" className="flex-nowrap overflow-auto">
          <Nav.Item className="me-2">
            <Nav.Link
              active={selectedFolder === "All"}
              onClick={() => onFolderSelect("All")}
              className="px-3 py-1"
            >
              All
            </Nav.Link>
          </Nav.Item>
          {folders.map((f) => (
            <Nav.Item key={f._id} className="me-2">
              <Nav.Link
                active={selectedFolder === f.name}
                onClick={() => onFolderSelect(f.name)}
                className="px-3 py-1"
              >
                {f.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </div>
  );
}