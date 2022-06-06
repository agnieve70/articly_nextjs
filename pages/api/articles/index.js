
import { connectDatabase } from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }
  const client = await connectDatabase();

  let arr = [];

  const articlesCollection = client.db().collection("articles");
  const articles = await articlesCollection.find().toArray();

  res.status(200).json({ message: "Articles Found", data: articles });
}

export default handler;
