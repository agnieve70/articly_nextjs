
import { connectDatabase } from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }
  const client = await connectDatabase();

  const concernsCollection = client.db().collection("concerns");
  const concerns = await concernsCollection.find().toArray();

  res.status(200).json({ message: "Concerns Found", data: concerns });
}

export default handler;
