import { Request, Response } from "express";
import mongoose from "mongoose";
import Conversations from "../../models/Conversations/Conversations";
import Message from "../../models/Message";

const removeConversation = async (req: Request, res: Response) => {
  try {
    const conversationId = new mongoose.Types.ObjectId(
      req.params.conversationId
    );

    await Conversations.findByIdAndDelete({
      _id: conversationId,
    });

    await Message.findOneAndDelete({ conversationId });

    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed , please try again" });
  }
};

export default removeConversation;
