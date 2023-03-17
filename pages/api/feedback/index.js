import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath) {
  return JSON.parse(fs.readFileSync(filePath).toString());
}

export default function handler(req, res) {
  const filePath = buildFeedbackPath();
  if (req.method === "POST") {
    const { email, text } = req.body;

    if (!email || !email.includes("@") || !text || text.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    // Store it in a database or in a file
    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text,
    };

    const data = extractFeedback(filePath);

    data.push(newFeedback);

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}
