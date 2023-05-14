import { Events } from "@/components/schemas";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    const result = await post(body);
    if (result === null) {
      return res.status(400).json({ message: "Body is incompatible" });
    }
    return res.status(200).json(result);
  }
  if (req.method === "GET") {
    return res.status(200).json(await get(req.query.q));
  }
  return res.status(200).json({ name: "John Doe" });
}

const post = async (content) => {
  try {
    const newEvent = await Events.create(content);
    return newEvent;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const get = async (query = "") => {
  let events = [];
  try {
    if (query === "" || query === "all") {
      events = await Events.scan().exec();
    } else {
      events = await Events.query("id").where("status").eq(query).exec();
    }
    return events;
  } catch (error) {
    console.log(error);
    return [];
  }
};
