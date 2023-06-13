// import { Events } from "@/components/schemas";
import Event from "@/components/models/events";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const result = await get(req.query.id);
    if (result !== null) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "Event not found" });
    }
  }
  return res.status(200).json({ name: "John Doe" });
}

const get = async (id) => {
  console.log(id);
  try {
    const event = await Event.findOne({ _id: id });
    return event;
  } catch (error) {
    console.log(error);
    return null;
  }
};
