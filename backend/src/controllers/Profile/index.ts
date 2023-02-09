import { Request, Response } from "express";
import User from "../../models/User/User";

const Profile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User in not defined" });
    }

    return res.status(200).json({ message: "success", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed , please try again" });
    process.exit(1);
  }
};

export default Profile;
