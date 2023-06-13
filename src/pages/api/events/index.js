// import { Events } from "@/components/schemas";
import Event from "@/components/models/events";
import connectMongo from "@/components/utils/connectMongo";

export default async function handler(req, res) {
  await connectMongo();

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

const getSummary = async () => {
  try {
    const summary = {};
    const events = await Event.find({});
    summary["total_events"] = events.length;
    summary["events"] = events.slice(0, 10);
    return summary;
  } catch (error) {
    console.log(error);
    return {};
  }
};

const post = async (content) => {
  try {
    const newEvent = await Event.create(content);
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
      events = await Event.find({});
    } else {
      events = await Event.find({ status: query });
    }
    return events;
  } catch (error) {
    console.log(error);
    return [];
  }
};
