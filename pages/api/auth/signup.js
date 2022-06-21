import { hashPassword } from "../../../helpers/auth-utils";
import { connectDatabase } from "../../../helpers/db-util";
import { createTransportEmail, sendEmail } from "../../../helpers/email-utils";
import { outputEmailTemplate } from "../../../constants/email_template";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, name, role } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid Input - password should also be at least 7 characters long.",
      });
    }

    const client = await connectDatabase();

    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User exists already!" });
      client.close();
      return;
    }

    const transporter = createTransportEmail();

    transporter.verify(function (error, success) {
      if (error) {
        res.status(500).json({ message: "There was an error sending email" });
      } 
    });

    const hashedPassword = await hashPassword(password);

    const code = Math.floor(Math.random() * 99999999 + 1);

    const result = await db.collection("users").insertOne({
      name: name,
      email: email,
      password: hashedPassword,
      confirmation_code: code,
      role: role
    });

    const sendEmailResult = await sendEmail(
      transporter,
      email,
      outputEmailTemplate(code)
    );

    res
      .status(201)
      .json({
        message: "Created User!",
        dbResult: result,
        emailResult: sendEmailResult,
      });
    client.close();
  }
}

export default handler;
