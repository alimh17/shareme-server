import { Request, Response } from "express";
import User from "../../models/User/User";

const conversationUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User is not exist" });
    }

    const data = {
      _id: user?._id,
      name: user?.name,
      username: user?.username,
      profile: user?.profile,
    };

    return res.status(200).json({ message: "success", data });
  } catch (err) {
    return res.status(500).json({ message: "Failed , please try again later" });
  }
};

export default conversationUser;
