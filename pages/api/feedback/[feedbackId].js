import { buildFeedbackPath, extractFeedback } from "./index";

export default function handler(req, res) {
  if (req.method === "POST") {
  } else {
    const feedbackId = req.query.feedbackId;
    const feedbackPath = buildFeedbackPath();
    const feedbackData = extractFeedback(feedbackPath);

    const selectedFeedback = feedbackData.find(
      (feedback) => feedback.id === feedbackId
    );

    res.status(200).json({ feedback: selectedFeedback });
  }
}
