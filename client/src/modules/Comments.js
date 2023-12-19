import React, { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({ isOpen, onClose, postid }) => {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [post, setPost] = useState(null);

  useEffect(() => {
    try {
      axios.get("/home").then((resp) => {
        const { posts, user } = resp.data; // Destructure the response data

        const foundPost = posts.find((post) => post.id === postid);

        if (foundPost) {
          console.log(foundPost);
          setPost(foundPost);
          setComments(foundPost.comments);
        } else {
          setPost(null);
          setComments([]);
        }

        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [isOpen, postid, comments]);

  if (!isOpen) {
    return null;
  }

  console.log(comments);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/home", { content: comment, postId: postid });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {post && (
          <div>
            <h1>{"post.author.username"}</h1>
            <img src={post.image} alt="" />
            <p>{post.caption}</p>
          </div>
        )}
        {user ? (
          <form action="" method="post" onSubmit={handleSubmit}>
            <textarea
              name="content"
              id="content"
              cols="20"
              rows="10"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <input type="submit" value="Comment" />
          </form>
        ) : (
          <h1>Log in to comment</h1>
        )}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={"comment.author.username"}>
              <h1>{comment.author.username}</h1>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments found</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
