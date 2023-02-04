import { Request, Response } from "express";
// import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../../models/User/User";
import { loginSchema } from "../../../utils/Vlidation/Auth-Validation";
import refreshTokenGenerator from "../../../middlewares/refreshToken";
import { Compare } from "../../../utils/bcrypt";

const loginController = async (req: Request, res: Response) => {
  try {
    const data: object = req.body;
    const { error, value } = loginSchema.validate(data);
    if (error) {
      return res.status(409).json({ message: error.details });
    }

    const user = await User.findOne({ email: value?.email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "کاربری با این مشخصات ثبت نشده است" });
    }

    const pass = await Compare(user.password, req.body.password);

    if (!pass) {
      return res
        .status(404)
        .json({ message: "کاربری با این مشخصات ثبت نشده است" });
    }

    const secret: string | undefined = process.env.SECRET_KEY;
    const access = jwt.sign({ user }, secret as string, {
      expiresIn: "14d",
    });

    const refresh = refreshTokenGenerator(user);
    const options = {
      maxAge: 1000 * 60 * 60 * 24 * 7, // would expire after 7 days
      httpOnly: true,
      signed: true, // Indicates if the cookie should be signed
    };

    res.cookie("user-shareme", { email: user.email }, options);
    res.status(200).json({ access, refresh, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
    process.exit(1);
  }
};

export default loginController;
