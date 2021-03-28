const handler = (req, res) => {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, comment } = req.body;

    // Add server-side validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      // terminate
      return;
    }

    const newComment = { id: new Date().toISOString(), email, name, comment };

    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const list = [
      {
        id: "2021-03-28T18:25:20.761Z",
        email: "user1@email.com",
        name: "111",
        comment: "1111",
      },
      {
        id: "2021-04-28T18:25:20.761Z",
        email: "user2@email.com",
        name: "222",
        comment: "2222",
      },
    ];

    res.status(200).json({ comments: list });
  }
};

export default handler;
