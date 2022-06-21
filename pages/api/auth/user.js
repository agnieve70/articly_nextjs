import { connectDatabase } from "../../../helpers/db-util";
const ObjectId = require("mongodb").ObjectID;

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  const id = req.query.id;

  const client = await connectDatabase();
  const db = client.db();

  const user = await db.collection("users").findOne({ _id: ObjectId(id) });

  res.status(200).json({ message: "User Found", data: user });
}

export default handler;
