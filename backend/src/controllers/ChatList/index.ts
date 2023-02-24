import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import User from "../../models/User/User";

const getChatList = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.slice(
      7,
      req.headers.authorization.length
    );

    const decoded: any = decode(token || "");

    if (!decoded) {
      return res.status(409).json({ message: "Token is not valid" });
    }

    const user = await User.findOne({ username: decoded.user.username });

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    return res.status(200).json({ message: "success", data: user.chatList });
  } catch (err) {
    return res.status(500).json({ message: "Failed , please try again" });
  }
};

export default getChatList;
