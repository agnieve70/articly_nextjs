import { connectDatabase } from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "PATCH") {
    const { code } = req.body;

    const client = await connectDatabase();

    const db = client.db();
    const result = await db
      .collection("users")
      .updateOne(
        { confirmation_code: +code },
        { $set: { confirmation_code: 0 } }
      );

    if (result.result.nModified === 0) {
      res.status(422).json({
        message: "Invalid Code",
        status: 0
      });
    } else {
      res.status(201).json({
        message: "Updated User!",
        status: 1,
      });
    }



  } else {
    res.status(500).json({
      message: "Invalid Method",
    });
  }
}

export default handler;
