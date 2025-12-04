import { useEffect, useState } from "react";
import { Button, FormControl, ListGroup, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import client from "../client";

export default function ManageFolders() {
  const { cid } = useParams();
  const [folders, setFolders] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const load = async () => {
    if (!cid) return;
    try {
      const data = await client.getFolders(cid);
      setFolders(data);
    } catch (e) {
      console.error("Failed to load folders", e);
    }
  };

  useEffect(() => {
    load();
  }, [cid]);

  const add = async () => {
    if (!name.trim()) {
      alert("Folder name cannot be empty");
      return;
    }
    try {
      await client.createFolder(cid || "current", name.trim());
      setName("");
      load();
    } catch (e) {
      console.error("Failed to create folder", e);
      alert("Failed to create folder");
    }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this folder? This cannot be undone.")) return;
    try {
      await client.deleteFolder(id);
      load();
    } catch (e) {
      console.error("Failed to delete folder", e);
      alert("Failed to delete folder");
    }
  };

  const startEdit = (folder: any) => {
    setEditingId(folder._id);
    setEditingName(folder.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const saveEdit = async (folderId: string) => {
    if (!editingName.trim()) {
      alert("Folder name cannot be empty");
      return;
    }
    try {
      // Note: You'll need to add updateFolder to your client
      // For now, we'll just cancel the edit
      // await client.updateFolder(folderId, editingName.trim());
      alert("Edit functionality not yet implemented in backend");
      cancelEdit();
      load();
    } catch (e) {
      console.error("Failed to update folder", e);
      alert("Failed to update folder");
    }
  };

  return (
    <div className="p-4">
      <h5 className="mb-4">Manage Folders</h5>

      <div className="alert alert-info">
        <strong>Configure Class Folders</strong>
        <p className="mb-0 small">
          Folders help organize posts and questions. Students can filter posts by folder.
        </p>
      </div>

      {/* Add New Folder */}
      <Form.Group className="mb-4">
        <Form.Label><strong>Add New Folder</strong></Form.Label>
        <div className="d-flex gap-2">
          <FormControl
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter folder name..."
            onKeyPress={(e) => e.key === "Enter" && add()}
          />
          <Button onClick={add} disabled={!name.trim()}>
            Add Folder
          </Button>
        </div>
      </Form.Group>

      {/* Folder List */}
      <h6 className="mb-3">Existing Folders</h6>
      <ListGroup>
        {folders.map((f) => (
          <ListGroup.Item 
            key={f._id} 
            className="d-flex justify-content-between align-items-center"
          >
            {editingId === f._id ? (
              <>
                <FormControl
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  size="sm"
                  className="me-2"
                />
                <div className="d-flex gap-2">
                  <Button 
                    size="sm" 
                    variant="success"
                    onClick={() => saveEdit(f._id)}
                  >
                    Save
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <span>{f.name}</span>
                <div className="d-flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline-primary"
                    onClick={() => startEdit(f)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="danger"
                    onClick={() => del(f._id)}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {folders.length === 0 && (
        <p className="text-muted text-center py-4">
          No folders yet. Add your first folder above.
        </p>
      )}
    </div>
  );
}