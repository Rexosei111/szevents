import Event from "@/components/models/events";
import connectMongo from "@/components/utils/connectMongo";

export default async function handler(req, res) {
  await connectMongo();

  if (req.method === "GET") {
    return res.status(200).json(await getSummary());
  }

  return res.status(200).json({ name: "John Doe" });
}

const getSummary = async () => {
  try {
    const summary = {};
    const events = await Event.find({});
    summary["total_events"] = events.length;
    summary["events"] = events.slice(0, 5);
    return summary;
  } catch (error) {
    console.log(error);
    return {};
  }
};
