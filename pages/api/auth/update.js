import { connectDatabase } from "../../../helpers/db-util";
import { createTransportEmail, sendEmail } from "../../../helpers/email-utils";
import { outputEmailTemplate } from "../../../constants/email_template";
const ObjectId = require("mongodb").ObjectID;

async function handler(req, res) {

  if (req.method !== "PATCH") {
    return;
  }

  const { id, name, email } = req.body;

  const client = await connectDatabase();
  const db = client.db();

  const code = Math.floor(Math.random() * 99999999 + 1);

  const transporter = createTransportEmail();

  transporter.verify(function (error, success) {
    if (error) {
      res.status(500).json({ message: "There was an error sending email" });
    }
  });

  const result = await db.collection("users").updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $set: {
        email: email,
        name: name,
        confirmation_code: code,
      },
    }
  );

  await sendEmail(transporter, email, outputEmailTemplate(code));

  res.status(201).json({
    message: "User is updated successfully!",
    dbResult: result,
  });

  client.close();

  return;
}

export default handler;
