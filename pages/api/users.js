import clientPromise from "../../lib/mongodb";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }

  // const client = await clientPromise;
  // const db = client.db("nextjs-mongodb-atlas-demo");
  // switch (req.method) {
  //   case "POST":
  //     let bodyObject = JSON.parse(req.body);
  //     let newPost = await db.collection("posts").insertOne(bodyObject);
  //     res.json(newPost.ops[0]);
  //     break;
  //   case "GET":
  //     const posts = await db.collection("posts").find({}).toArray();
  //     res.json({ status: 200, data: posts });
  //     break;
  // }
}
