import fs from "fs";
import path from "path";
export default function handler(req, res) {
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

    const filePath = path.join(process.cwd(), "data", "feedback.json");

    const fileData = fs.readFileSync(filePath);

    const data = JSON.parse(fileData.toString());

    data.push(newFeedback);

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    res.status(200).json({ message: "This is a feedback page" });
  }
}
