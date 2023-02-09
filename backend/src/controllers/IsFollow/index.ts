import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import User from "../../models/User/User";

export const IsFollow = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.slice(
      7,
      req.headers.authorization.length
    );
    const { profile } = req.body;
    const decoded: any = decode(token || "");

    if (!decoded) {
      return res.status(409).json({ message: "Token is not valid" });
    }

    //! Here checking user exists in list followers
    const user = await User.findOne({
      username: profile?.username,
      followers: { $elemMatch: { _id: decoded.user._id } },
    });

    if (!user) {
      return res.status(200).json({
        message: "User is not exists in the followers",
        status: false,
      });
    }

    res
      .status(200)
      .json({ message: "User is exist in the followers", status: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed , please try again" });
    process.exit(1);
  }
};
