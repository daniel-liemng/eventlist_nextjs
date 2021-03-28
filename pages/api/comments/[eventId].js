import fs from "fs";
import path from "path";

const handler = (req, res) => {
  const eventId = req.query.eventId;
  const { email, name, comment } = req.body;

  if (req.method === "POST") {
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      comment,
      eventId,
    };

    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).json({ message: "Success", comment: newComment });
  } else {
    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    res.status(200).json({ message: "Success", comments: data });
  }
};

export default handler;
