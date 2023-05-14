import { Events } from "@/components/schemas";

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
  try {
    const event = await Events.get(id);
    return event;
  } catch (error) {
    return null;
  }
};
