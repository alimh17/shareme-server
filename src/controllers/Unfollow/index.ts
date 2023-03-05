import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import User from "../../models/User/User";

export const Unfollow = async (req: Request, res: Response) => {
  try {
    //! Here checking access token
    const token = req.headers.authorization?.slice(
      7,
      req.headers.authorization.length
    );
    const decoded: any = await decode(token || "");
    if (!decoded) {
      return res.status(409).json({ message: "Token is not valid" });
    }

    //! Here update user followers list
    const user = await User.findOneAndUpdate(
      { username: req?.body?.username },
      { $pull: { followers: { username: decoded.user.username } } },
      { new: true }
    );

    //! Here update me followings list
    const me = await User.findOneAndUpdate(
      { username: decoded.user.username },
      { $pull: { followings: { username: req?.body.username } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User is not defined" });
    }
    if (!me) {
      return res.status(404).json({ message: "User is not defined" });
    }

    await user?.save();
    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed , please try again" });
    process.exit(1);
  }
};
