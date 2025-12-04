import { useState, useMemo } from "react";
import { FormControl, Button } from "react-bootstrap";
import PostsList from "./PostsList";
import NewPostButton from "./NewPostButton";

interface LOPSProps {
  posts: any[];
  onSelect: (post: any) => void;
  selectedId?: string;
  refresh: () => void;
  selectedFolder: string;
  toggleSidebar: () => void;
}

export default function LOPS({ 
  posts = [], 
  onSelect, 
  selectedId, 
  selectedFolder,
  toggleSidebar 
}: LOPSProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filteredPosts = posts;

    // Filter by folder
    if (selectedFolder && selectedFolder !== "All") {
      filteredPosts = filteredPosts.filter((p: any) => 
        (p.folders || []).includes(selectedFolder)
      );
    }

    // Filter by search query
    if (q) {
      filteredPosts = filteredPosts.filter((p: any) =>
        (p.summary || "").toLowerCase().includes(q) ||
        (p.details || "").replace(/<[^>]+>/g, "").toLowerCase().includes(q)
      );
    }

    // Sort newest first
    return filteredPosts.sort(
      (a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [posts, query, selectedFolder]);

  return (
    <div className="pazza-lops p-3">
      {/* Toggle and Controls */}
      <div className="d-flex align-items-center mb-3">
        <Button 
          variant="link" 
          size="sm" 
          onClick={toggleSidebar}
          className="p-0 me-3 text-dark"
          title="Hide sidebar"
        >
          ◀
        </Button>
        <span className="text-muted small me-auto">
          Unread | Updated | Unresolved | Following
        </span>
      </div>

      {/* New Post Button */}
      <div className="mb-2">
        <NewPostButton />
      </div>

      {/* Search Field */}
      <FormControl
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-3"
        size="sm"
      />

      {/* Posts List */}
      <div className="pazza-posts-list">
        <PostsList 
          posts={filtered} 
          onSelect={onSelect} 
          selectedId={selectedId} 
        />
      </div>
    </div>
  );
}