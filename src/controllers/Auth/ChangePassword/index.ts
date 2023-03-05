import { hash } from "bcrypt";
import { Request, Response } from "express";
import User from "../../../models/User/User";

const changePassword = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User is not exist" });
    }

    if (req.body.code !== user.code) {
      return res.status(404).json({ message: "your code not correct" });
    }

    const hashPassword = await hash(req?.body?.values?.password, 10);

    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: hashPassword }
    );

    return res.status(200).json({ message: "success , password changed" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed , please try again" });
  }
};

export default changePassword;
