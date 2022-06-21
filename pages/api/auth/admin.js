import { connectDatabase } from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }
  const client = await connectDatabase();

  const adminCollection = client.db().collection("users");
  const admins = await adminCollection
    .find({
      role: "admin",
    })
    .toArray();

  res.status(200).json({ message: "Admin Users Found", data: admins });
}

export default handler;
