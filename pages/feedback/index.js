import { useRef, useState } from "react";
import fs from "fs";
import path from "path";

export const getStaticProps = () => {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const fileData = fs.readFileSync(filePath);
  const feedback = JSON.parse(fileData);
  return {
    props: {
      feedback,
    },
  };
};

const Feebback = (props) => {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const [singleFb, setSingleFb] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: enteredEmail, feedback: enteredFeedback }),
    });

    const data = await res.json();
  };

  const loadFeedback = async () => {
    const res = await fetch("api/feedback");
    const data = await res.json();

    console.log(data);
  };

  const loadSingleFeedback = async (id) => {
    const res = await fetch(`/api/feedback/${id}`);
    const data = await res.json();

    console.log("SSS", data);
    setSingleFb(data.feedback);
  };

  console.log(props);

  return (
    <>
      <h1>Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='text' id='email' ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor='feedback'>Email</label>
          <textarea id='feedback' rows='5' ref={feedbackInputRef}></textarea>
        </div>
        <button type='submit'>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedback}>Load Feedback</button>
      <hr />
      <ul>
        {props.feedback &&
          props.feedback.map((item) => (
            <li key={item.id}>
              {item.feedback}{" "}
              <button onClick={() => loadSingleFeedback(item.id)}>
                Show details
              </button>
            </li>
          ))}
      </ul>
      <hr />
      {singleFb && (
        <div>
          <h3>{singleFb.email}</h3>
          <p>{singleFb.feedback}</p>
        </div>
      )}
    </>
  );
};

export default Feebback;
