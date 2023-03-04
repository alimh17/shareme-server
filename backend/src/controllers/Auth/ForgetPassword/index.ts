import { Request, Response } from "express";
import User from "../../../models/User/User";
import sendMail from "../../../utils/mailer";

const forgetPassword = async (req: Request, res: Response) => {
  try {
    const user: any = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not exist" });
    }

    let code = "";

    for (let i = 0; code.length < 5; i++) {
      const random = Math.floor(Math.random() * 10);
      code += random;
    }

    sendMail(user.email, code);

    await User.findOneAndUpdate({ email: user.email }, { code });

    return res.status(200).json({ message: "success", user: user.email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed , please try again" });
  }
};

export default forgetPassword;
