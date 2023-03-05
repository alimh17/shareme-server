import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import User from "../../models/User/User";

const followingPage = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.slice(
      7,
      req.headers.authorization.length
    );
    const decoded: any = decode(token || "");

    if (!decoded) {
      return res.status(409).json({ message: "Token is not valid" });
    }

    const user: any = await User.findOne({ username: decoded.user.username });
    const users = await User.find({});

    const editUser = [];

    for (const u of users) {
      editUser.push({
        username: u.username,
        _id: u._id,
        name: u.name,
        profile: u.profile,
      });
    }

    //! Filter of following list user
    const filteredUsers = editUser.filter(
      (u) => !user.followings.some((f: any) => f.username === u.username)
    );

    //! Filter self user
    const data = filteredUsers.filter(
      (user: any) => user.username !== decoded.user.username
    );

    console.log(data);

    return res.status(200).json({ message: "success", data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed , please try again" });
  }
};

export default followingPage;
