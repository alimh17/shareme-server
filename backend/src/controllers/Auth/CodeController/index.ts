import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../../models/User/User";

const codeController = async (req: Request, res: Response) => {
  try {
    const findUser: any = await User.findOne({ email: req.body.email });
    if (findUser.code !== req.body.code) {
      return res.status(404).json({ message: "your code not correct" });
    }

    const secret: string | undefined = process.env.SECRET_KEY;

    const { _id, username } = findUser;

    const user = {
      _id,
      username,
    };

    const access = jwt.sign({ user }, secret as string, {
      expiresIn: "14d",
    });
    const refresh = jwt.sign({ user }, secret as string, {
      expiresIn: "365d",
    });

    const options = {
      maxAge: 1000 * 60 * 60 * 24 * 14, // would expire after 14 days
      httpOnly: true,
      signed: true, // Indicates if the cookie should be signed
    };

    res.cookie("user-shareme", { email: findUser.email }, options);
    return res.status(200).json({ access, refresh });
  } catch (err) {
    return res.status(500).json({ message: "Failed , please try again" });
  }
};

export default codeController;
