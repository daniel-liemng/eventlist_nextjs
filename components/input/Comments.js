import { useState, useEffect } from "react";

import classes from "../../styles/Comments.module.css";

import NewComment from "./NewComment";
import CommentList from "./CommentList";

const Comments = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await fetch(`/api/comments/${props.eventId}`);
    const data = await res.json();
    setComments(data.comments);
  };

  useEffect(() => {
    // if Comment Box open, fetch all comments
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = async (data) => {
    // send data to API
    const res = await fetch(`/api/comments/${props.eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // const { email, name, comment } = data;
      body: JSON.stringify(data),
    });

    const returnedData = await res.json();

    console.log("return", returnedData);
  };

  console.log("comments", comments);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
};

export default Comments;
