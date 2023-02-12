import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import User from "../../models/User/User";

export const Follow = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.slice(
    7,
    req.headers.authorization.length
  );
  try {
    const decoded: any = decode(token || "");

    if (!decoded) {
      return res.status(409).json({ message: "Token is not valid" });
    }

    //! update user followers list
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { followers: decoded.user } },
      { new: true }
    );

    //! update my followings list
    const me = await User.findOneAndUpdate(
      { username: decoded.user.username },
      { $push: { followings: req?.body } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User is not defined" });
    }

    if (!me) {
      return res.status(404).json({ message: "User is not defined" });
    }

    await user?.save();
    await me?.save();

    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed , please try again" });
    process.exit(1);
  }
};
