import { useRef } from "react";

import classes from "../../styles/NewsletterRegistration.module.css";

const NewsletterRegistration = () => {
  const emailInputRef = useRef();

  const registrationHandler = async (e) => {
    e.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    const enteredEmail = emailInputRef.current.value;

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: enteredEmail }),
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button type='submit'>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
