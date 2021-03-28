import fs from "fs";
import path from "path";

const handler = (req, res) => {
  const fbId = req.query.feedbackId;

  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  const selectedFeedback = data.find((fb) => fb.id === fbId);

  res.status(200).json({ feedback: selectedFeedback });
};

export default handler;
