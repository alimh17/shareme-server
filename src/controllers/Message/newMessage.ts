import { Request, Response } from "express";
import Message from "../../models/Message";

const newMessage = async (req: Request, res: Response) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    return res.status(200).json({ message: "success", newMessage });
  } catch (err) {
    return res.status(500).json({ message: "Failed , please try again" });
  }
};

export default newMessage;
