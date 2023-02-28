import { Request, Response } from "express";
import Conversations from "../../models/Conversations/Conversations";

const conversationController = async (req: Request, res: Response) => {
  try {
    const checkSender = await Conversations.find({
      members: [req.body.senderId, req.body.receiverId],
    });

    const checkReceiver = await Conversations.find({
      members: [req.body.receiverId, req.body.senderId],
    });

    if (checkSender.length > 0 || checkReceiver.length > 0) {
      return res.status(409).json({ message: "conversation is exist" });
    }

    const newConversation = new Conversations({
      members: [req.body.senderId, req.body.receiverId],
    });

    await newConversation.save();

    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: "Failed , please try again" });
  }
};

export default conversationController;
