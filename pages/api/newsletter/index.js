const handler = (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    // Validate
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      // terminate
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
};

export default handler;
