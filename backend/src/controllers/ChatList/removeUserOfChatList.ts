import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import User from "../../models/User/User";

const removeUserOfChatList = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.slice(
      7,
      req.headers.authorization.length
    );

    const decoded: any = decode(token || "");

    if (!decoded) {
      return res.status(409).json({ message: "Token is not valid" });
    }

    const { username } = req.body;

    await User.findOneAndUpdate(
      { username: decoded.user.username },
      {
        $pull: { chatList: { username } },
      }
    );

    return res.status(200).json({ message: "success , user removed" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed , please try againe" });
  }
};

export default removeUserOfChatList;
