import { Fragment, useRef } from "react";

function HomePage() {
  const emailRef = useRef();
  const feedbackRef = useRef();

  function sendFeedbackHandler(event) {
    event.preventDefault();
    const enteredEmail = emailRef.current?.value;
    const enteredFeedback = feedbackRef.current?.value;

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
  return (
    <Fragment>
      <h1>The Home Page</h1>
      <form onSubmit={sendFeedbackHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input ref={emailRef} id="email" type="email" />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea ref={feedbackRef} id="feedback" rows={5} />
        </div>
        <button>Send Feedback</button>
      </form>
    </Fragment>
  );
}

export default HomePage;
