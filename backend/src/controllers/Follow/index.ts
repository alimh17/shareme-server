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
    const user = await User.findOne({ username: req.body.username });
    const me = await User.findOne({ username: decoded.user.username });

    if (!user) {
      return res.status(404).json({ message: "User is not defined" });
    }

    if (!me) {
      return res.status(404).json({ message: "User is not defined" });
    }

    const { _id, username, profile, name } = me;

    //! update user followers list
    await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { followers: { _id, username, profile, name } } },
      { new: true }
    );

    //! update my followings list
    await User.findOneAndUpdate(
      { username: decoded.user.username },
      {
        $push: {
          followings: {
            _id: user._id,
            username: user.username,
            profile: user.profile,
            name: user.name,
          },
        },
      },
      { new: true }
    );

    await user?.save();
    await me?.save();

    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed , please try again" });
    process.exit(1);
  }
};
