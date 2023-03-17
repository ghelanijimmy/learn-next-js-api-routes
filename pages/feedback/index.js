import { buildFeedbackPath, extractFeedback } from "../api/feedback";
import { useState } from "react";

export default function FeedbackPage({ feedbackItems }) {
  const [feedbackData, setFeedbackData] = useState();
  const loadFeedbackHandler = (id) => {
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => setFeedbackData(data.feedback));
  };
  return (
    <div>
      <h1>The Feedback Page</h1>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            <>
              {item.text}
              <p>
                <button onClick={loadFeedbackHandler.bind(null, item.id)}>
                  Show Details
                </button>
              </p>
            </>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}
