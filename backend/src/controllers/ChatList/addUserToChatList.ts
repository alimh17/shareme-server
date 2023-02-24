import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import User from "../../models/User/User";

const addUserToChatList = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.slice(
      7,
      req.headers.authorization.length
    );

    const decoded: any = decode(token || "");

    if (!decoded) {
      return res.status(409).json({ message: "Token is not valid" });
    }

    const { name, username, avatar } = req.body;
    const user = await User.findOne({ username: decoded.user.username });

    if (!user) {
      return res.status(404).json({ message: "user is not found" });
    }

    const has = user.chatList.find((f: any) => f.username === username);

    if (has) {
      return res
        .status(409)
        .json({ message: "user already exists in chatList." });
    }

    await User.findOneAndUpdate(
      { username: decoded.user.username },
      { $push: { chatList: { name, username, avatar } } },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "success , user added to chatlist" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed , please try again" });
  }
};

export default addUserToChatList;
