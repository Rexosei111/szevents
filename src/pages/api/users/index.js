import connectMongo from "@/components/utils/connectMongo";
import User from "@/components/models/user";

export default async function handler(req, res) {
  await connectMongo();

  if (req.method === "GET") {
    return res.status(200).json(await get_users());
  }
  if (req.method === "POST") {
    const created = await add_user(req.body);
    if (created) {
      return res.status(201).json({ message: "Created" });
    } else {
      return res.status(400).json({ message: "Unable to create new user" });
    }
  }
}

const get_users = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const add_user = async (data) => {
  try {
    const newUser = await User.create(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
