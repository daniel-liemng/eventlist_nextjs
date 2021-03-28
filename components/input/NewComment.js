import { useRef } from "react";

import classes from "../../styles/NewComment.module.css";

const NewComment = (props) => {
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: emailInputRef.current.value,
      name: nameInputRef.current.value,
      comment: commentInputRef.current.value,
    };

    props.onAddComment(data);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea id='comment' rows='5' ref={commentInputRef}></textarea>
      </div>
      {/* {isInvalid && <p>Please enter a valid email address and comment!</p>} */}
      <button type='submit'>Submit</button>
    </form>
  );
};

export default NewComment;
