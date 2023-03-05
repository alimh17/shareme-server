import { Request, Response } from "express";
import Message from "../../models/Message";

const getMessage = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    return res.status(200).json({ message: "success", messages });
  } catch (err) {
    return res.status(500).json({ message: "Failed , please try again" });
  }
};

export default getMessage;
