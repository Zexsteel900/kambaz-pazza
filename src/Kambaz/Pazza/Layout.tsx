import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import LOPS from "./LeftSideBar/LOPS";
import PostView from "./PostScreen/PostView";
import ClassAtGlance from "./PostScreen/ClassAtGlance";
import client from "./client";
import { useParams, useNavigate } from "react-router-dom";
import FoldersBar from "./FolderBar";

export default function Layout() {
  const { cid, pid } = useParams();
  const courseId = cid || "";
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>("All");
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  const loadPosts = async () => {
    if (!courseId) return;
    try {
      const p = await client.getPosts(courseId);
      setPosts(p || []);
    } catch (e) {
      console.error("Failed to load posts", e);
      setPosts([]);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [courseId]);

  // Load specific post if pid is in URL
  useEffect(() => {
    const loadPost = async () => {
      if (!pid) {
        setSelectedPost(null);
        return;
      }
      try {
        const p = await client.getPost(pid);
        setSelectedPost(p);
      } catch (e) {
        console.error("Failed to load post", e);
        setSelectedPost(null);
      }
    };
    loadPost();
  }, [pid]);

  const handleSelect = (post: any) => {
    if (!post) return;
    navigate(`/Kambaz/Courses/${courseId}/Pazza/post/${post._id}`);
  };

  const handleRefresh = async () => {
    await loadPosts();
    if (pid) {
      const p = await client.getPost(pid);
      setSelectedPost(p);
    }
  };

  return (
    <>
      <FoldersBar selectedFolder={selectedFolder} onFolderSelect={setSelectedFolder} />
      
      <Row className="pazza-main-content g-0">
        {showSidebar && (
          <Col md={4} lg={3} className="pazza-sidebar-col">
            <LOPS
              posts={posts}
              onSelect={handleSelect}
              selectedId={selectedPost?._id || pid}
              refresh={loadPosts}
              selectedFolder={selectedFolder}
              toggleSidebar={() => setShowSidebar(false)}
            />
          </Col>
        )}

        <Col md={showSidebar ? 8 : 12} lg={showSidebar ? 9 : 12} className="pazza-content-col">
          {!showSidebar && (
            <button 
              className="btn btn-sm btn-outline-secondary m-2"
              onClick={() => setShowSidebar(true)}
            >
              ▶ Show Sidebar
            </button>
          )}
          
          {selectedPost || pid ? (
            <PostView
              post={selectedPost}
              postId={pid}
              onRefresh={handleRefresh}
            />
          ) : (
            <ClassAtGlance posts={posts} />
          )}
        </Col>
      </Row>
    </>
  );
}