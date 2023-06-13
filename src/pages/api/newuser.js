import connectMongo from "@/components/utils/connectMongo";
import User from "../../models/user";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addUser(req, res) {
  try {
    await connectMongo();

    const user = await User.create({
      name: "Osei",
      email: "kyeisamuel931@gmail.com",
      password: "rexosei111",
    });
    // console.log("CREATED DOCUMENT");

    // const user = await User.findOne({
    //   email: "kyeisamuel931@gmail.com",
    // }).select("-__v -password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
