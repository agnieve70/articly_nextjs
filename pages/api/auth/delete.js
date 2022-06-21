import { connectDatabase } from "../../../helpers/db-util";
var ObjectId = require("mongodb").ObjectID;

async function handler(req, res) {
  if (req.method !== "DELETE") {
    return;
  }

  const user_id = req.query.id;
  const client = await connectDatabase();

  const db = client.db();
  const result = await db
    .collection("users")
    .deleteOne({ _id: ObjectId(user_id) });

  res.status(201).json({
    message: "Article Was Deleted!",
    dbResult: result,
  });
}

export default handler;
