import Event from "@/components/models/events";
import { Transactions } from "@/components/models/transaction";
import { Tickets } from "@/components/models/ticket";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const transaction = await saveTransaction(req.body);
    console.log(transaction);
    const ticket = await createTicket(req.body);
    if (ticket === false) {
      return res.status(400).json({ message: "Unable to create ticket" });
    }
    return res.status(200).json(ticket);
  }
}

const createTicket = async (data) => {
  try {
    const ticket = await Tickets.create({ ...data });
    return ticket;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const saveTransaction = async (transDetails) => {
  try {
    const transaction = await Transactions.create({ ...transDetails });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
