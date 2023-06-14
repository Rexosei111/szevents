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
  if (req.method === "PUT") {
    const result = await put(req.query.id, req.body);
    if (result !== null) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json({ message: "Unable to update event" });
    }
  }
  return res.status(200).json({ name: "John Doe" });
}

const get = async (id) => {
  try {
    const event = await Event.findOne({ _id: id });
    return event;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const put = async (id, body) => {
  try {
    const updatedEvent = await Event.updateOne({ _id: id }, { ...body });
    return updatedEvent;
  } catch (error) {
    return null;
  }
};
