import { Request, Response } from "express";
import Conversations from "../../models/Conversations/Conversations";

const getConversations = async (req: Request, res: Response) => {
  try {
    const conversation = await Conversations.find({
      members: { $in: [req.params.userId] },
    });
    return res.status(200).json(conversation);
  } catch (err) {
    return res.status(500).json({ message: "Failed , please try again" });
  }
};

export default getConversations;
