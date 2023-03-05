import { Request, Response } from "express";
import { hash } from "bcrypt";
// const nodemailer = require("nodemailer");

import { registerSchema } from "../../../utils/Vlidation/Auth-Validation";
import User from "../../../models/User/User";
import sendMail from "../../../utils/mailer";

const registerController = async (req: Request, res: Response) => {
  try {
    const data: object = req.body;
    const { error, value } = registerSchema.validate(data);
    if (error) {
      return res.status(409).json({ error: error.details });
    }

    const userEmail = await User.findOne({ email: value.email });
    const userUsername = await User.findOne({ username: value.username });

    if (userEmail) {
      return res
        .status(401)
        .json({ message: "There is a user with this profile" });
    }

    if (userUsername) {
      return res
        .status(401)
        .json({ message: "There is a user with this profile" });
    }

    const hashPassword = await hash(value.password, 10);
    let code = "";

    for (let i = 0; code.length < 5; i++) {
      const random = Math.floor(Math.random() * 10);
      code += random;
    }

    sendMail(value.email, code);

    const user = new User({
      username: value.username,
      email: value.email,
      password: hashPassword,
      profile: req.file ? `profile/${req.file.filename}` : "",
      code,
    });

    await user.save();

    return res.status(200).json({ success: "success", email: value.email });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
    process.exit(1);
  }
};

export default registerController;
