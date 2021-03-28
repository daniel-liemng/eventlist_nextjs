import fs from "fs";
import path from "path";

const handler = (req, res) => {
  const { email } = req.body;

  if (req.method === "POST") {
    const newNewsletter = {
      id: new Date().toISOString(),
      email,
    };

    const filePath = path.join(process.cwd(), "data", "newsletter.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newNewsletter);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).json({ message: "Success", newsletter: newNewsletter });
  } else {
    res.status(400).json({ error: "Fails" });
  }
};

export default handler;
