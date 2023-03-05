import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import User from "../../models/User/User";

const Users = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.slice(
      7,
      req.headers.authorization.length
    );
    const decoded: any = decode(token || "");

    if (!decode) {
      return res.status(409).json({ message: "user is not exist or expire" });
    }

    const findUsers = await User.find();

    if (!findUsers) {
      return res.status(404).json({ message: "user not exist" });
    }

    const users = findUsers.map(({ username, _id, profile, name }) => {
      return { username, _id, profile, name };
    });

    const filter = users.filter(
      (user: any) => user.username !== decoded.user.username
    );

    return res.status(200).json({ message: "success", users: filter });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed , Please try again" });
  }
};

export default Users;
