import { Request, Response } from "express";
import { decode, sign } from "jsonwebtoken";
import User from "../../models/User/User";

const Refresh = async (req: Request, res: Response) => {
  try {
    const token: any = req.headers.authorization?.slice(
      7,
      req.headers.authorization.length
    );

    if (!token) {
      return res.status(409).json({ message: "Please send access token" });
    }
    const decoded: any = await decode(token || "");

    if (!decoded) {
      return res.status(409).json({ message: "Token is not valid" });
    }
    const findUser: any = await User.findOne({
      username: decoded.user.username,
    });

    if (!findUser) {
      return res.status(404).json({ message: "User is not exist" });
    }

    const user = {
      username: findUser.username,
      name: findUser.name,
      bio: findUser.bio,
      profile: findUser.profile,
    };

    const secret: string | undefined = process.env.SECRET_KEY;

    const access = sign({ user }, secret as string, {
      expiresIn: "14d",
    });

    res.status(200).json({ message: "success", access, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed , try again!" });
    process.exit(1);
  }
};

export default Refresh;
