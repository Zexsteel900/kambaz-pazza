import React, { useMemo } from "react";
import { ListGroup, Badge, Accordion } from "react-bootstrap";
import { format, isToday, isYesterday, startOfWeek, endOfWeek } from "date-fns";

interface PostsListProps {
  posts: any[];
  onSelect: (post: any) => void;
  selectedId?: string;
}

export default function PostsList({ posts = [], onSelect, selectedId }: PostsListProps) {
  
  const groupedPosts = useMemo(() => {
    const groups: { [key: string]: any[] } = {
      Today: [],
      Yesterday: [],
    };

    posts.forEach((post) => {
      const date = new Date(post.createdAt);
      
      if (isToday(date)) {
        groups.Today.push(post);
      } else if (isYesterday(date)) {
        groups.Yesterday.push(post);
      } else {
        // Group by week
        const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Monday
        const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
        const weekLabel = `${format(weekStart, 'M/d')} - ${format(weekEnd, 'M/d')}`;
        
        if (!groups[weekLabel]) {
          groups[weekLabel] = [];
        }
        groups[weekLabel].push(post);
      }
    });

    return groups;
  }, [posts]);

  const renderPost = (p: any) => (
    <ListGroup.Item
      key={p._id}
      active={selectedId === p._id}
      action
      onClick={() => onSelect(p)}
      className="pazza-post-item"
    >
      <div className="d-flex justify-content-between align-items-start">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="fw-bold text-truncate">{p.summary}</div>
          <div className="text-muted small">
            {p.author?.firstName || "Unknown"} • {p.postType === "question" ? "Question" : "Note"}
          </div>
          <div className="pazza-post-snippet text-muted">
            {p.details ? p.details.replace(/<[^>]+>/g, "").slice(0, 100) : ""}
          </div>
        </div>
        <div className="text-end ms-2" style={{ minWidth: "fit-content" }}>
          <div className="small text-muted">
            {format(new Date(p.createdAt), "M/d/yy")}
          </div>
          {p.folders && p.folders.length > 0 && (
            <Badge bg="secondary" className="mt-1">
              {p.folders[0]}
            </Badge>
          )}
        </div>
      </div>
    </ListGroup.Item>
  );

  return (
    <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
      {Object.entries(groupedPosts).map(([groupName, groupPosts], idx) => {
        if (groupPosts.length === 0) return null;
        
        return (
          <Accordion.Item eventKey={String(idx)} key={groupName}>
            <Accordion.Header>
              {groupName} ({groupPosts.length})
            </Accordion.Header>
            <Accordion.Body className="p-0">
              <ListGroup variant="flush">
                {groupPosts.map(renderPost)}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}