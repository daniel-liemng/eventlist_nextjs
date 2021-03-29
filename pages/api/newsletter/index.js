import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    // Validate
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      // terminate
      return;
    }

    // Connect to MongpDB
    const mongo_uri =
      "mongodb+srv://liem:liem1234@cluster0.ofhap.mongodb.net/newsletter?retryWrites=true&w=majority";
    const client = await MongoClient.connect(mongo_uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    const db = client.db();

    await db.collection("emails").insertOne({ email });

    client.close();

    res.status(201).json({ message: "Signed up!" });
  }
};

export default handler;
