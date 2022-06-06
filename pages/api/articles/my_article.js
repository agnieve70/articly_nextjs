import { connectDatabase } from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }
  const email = req.query.email;

  const client = await connectDatabase();

  const articlesCollection = client.db().collection("articles");
  const articles = await articlesCollection.findOne({
    email: email,
  });

  if (articles) {
    res.status(200).json({ message: "Article Found", data: articles });
  } else {
    res.status(404).json({ message: "No Article Found", data: [] });
  }
}

export default handler;
