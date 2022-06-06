import { getSession } from "next-auth/client";
import { connectDatabase } from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const { title, content } = req.body;

  if (
    !title ||
    title.trim().length < 7 ||
    !content ||
    content.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid Input - Title and contents should be at least 7 characters long.",
    });
    return;
  }

  const client = await connectDatabase();

  const db = client.db();
  const existingArticle = await db
    .collection("articles")
    .findOne({ title: title });

  if (existingArticle) {
    res.status(422).json({ message: "Article exists already!" });
    client.close();
    return;
  }

  const existingUser = await db
    .collection("articles")
    .findOne({ email: session.user.email });

    let result;

  if (existingUser) {
    result = await db.collection("articles").updateOne(
      {
        email: session.user.email,
      },
      {
        $set: {
          title: title,
          content: content,
        },
      }
    );
  } else {
     result = await db.collection("articles").insertOne({
      title: title,
      content: content,
      email: session.user.email,
    });
  }

  res.status(201).json({
    message: "Article Published!",
    dbResult: result,
  });

  client.close();
  return;
}

export default handler;
