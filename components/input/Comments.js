import { useState } from "react";

import classes from "../../styles/Comments.module.css";

import NewComment from "./NewComment";
import CommentList from "./CommentList";

const Comments = (props) => {
  const [showComments, setShowComments] = useState(false);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = async (data) => {
    const { email, name, comment } = data;

    // send data to API
    const res = await fetch(`/api/comments/${props.eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, comment }),
    });

    const returnedData = await res.json();

    console.log("return", returnedData);
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
};

export default Comments;
