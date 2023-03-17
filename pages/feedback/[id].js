export default function FeedbackItem(props) {
  const { feedback } = props;

  return (
    <li>
      {feedback.text} - <button>Show Details</button>
    </li>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const feedbackId = params.feedbackId;

  // fetch data for a single feedback item

  return {
    props: {
      feedback: {
        id: feedbackId,
        text: "Some feedback",
      },
    },
  };
}
