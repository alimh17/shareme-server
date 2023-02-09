import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import User from "../../models/User/User";

const maybeYouKnow = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.slice(
      7,
      req.headers.authorization.length
    );
    const decoded: any = decode(token || "");

    if (!decode) {
      return res.status(409).json({ message: "Access token is required" });
    }

    const user = await User.findOne({ _id: decoded.user._id });

    if (!user) {
      return res.status(404).json({ message: "User is not defined" });
    }

    console.log(decoded.user?.followings[0].followers);
    res.status(200).json({ message: "success", user: user.followings });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: "Failed , please try again" });
    process.exit(1);
  }
};

export default maybeYouKnow;
