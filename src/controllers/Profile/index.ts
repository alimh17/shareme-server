import { Request, Response } from "express";
import User from "../../models/User/User";

const Profile = async (req: Request, res: Response) => {
  try {
    const findUser = await User.findOne({ username: req.params.username });

    if (!findUser) {
      return res.status(404).json({ message: "User in not defined" });
    }

    const { _id, username, name, profile, bio, followers, followings, posts } =
      findUser;

    const user = {
      _id,
      username,
      name,
      profile,
      bio,
      followers: followers.length,
      followings: followings.length,
      posts: posts.length,
    };

    return res.status(200).json({ message: "success", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed , please try again" });
    process.exit(1);
  }
};

export default Profile;
