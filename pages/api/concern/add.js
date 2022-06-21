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

  const { lat, lng, type } = req.body;

  if (!lat || !lng || !type) {
    res.status(422).json({
      message:
        "Invalid Input - Latitude, Longitude and Type of Concern fields are required",
    });
    return;
  }

  const client = await connectDatabase();
  const db = client.db();


  const isPending = await db
    .collection("users")
    .findOne({ email: session.user.email, status: "pending" });


  if (isPending) {
    res.status(422).json({
      message: "You've already sent help",
    });
    client.close();

    return;
  } else {
    await db.collection("concerns").insertOne({
      lat: lat,
      lng: lng,
      type: type,
      user_id: session.user._id,
    });

    const result = await db.collection("users").updateOne(
      {
        email: session.user.email,
      },
      {
        $set: {
          status: "pending",
        },
      }
    );

    res.status(201).json({
      message: "Help is sent!",
      dbResult: result,
    });

    client.close();

    return;
  }
}

export default handler;
