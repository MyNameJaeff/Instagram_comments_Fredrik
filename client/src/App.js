import React, { useEffect, useState } from "react";
import Comment from "./modules/Comments";
import axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  let usr = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("/home").then((resp) => setPosts(resp.data.posts));
  }, []);

  const handlePostClick = (postId) => {
    setIsModalOpen(true);
    setSelectedPostId(postId);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} onClick={() => handlePostClick(post.id)}>
          <h1>{console.log(post.authorId)}</h1>
          <img src={post.image} alt="" />
          <p>{post.title}</p>
        </div>
      ))}
      <Comment isOpen={isModalOpen} onClose={handleModalClose} postid={selectedPostId} />
    </div>
  );
};

export default App;
