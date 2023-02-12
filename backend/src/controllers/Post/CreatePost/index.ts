import { Request, Response } from "express";
import { decode } from "jsonwebtoken";

import Post from "../../../models/Post/Post";
import User from "../../../models/User/User";

import getMediaPost from "./getMediaPost";
import updateFollowingList from "./updateFollowingList";

const createPost = async (req: Request, res: Response) => {
  try {
    //! files is Requred for create post --- image or video
    if (!req.files) {
      return res.status(409).json({ message: "Please send a image or video" });
    }

    //! Here decoded access token and get user data
    const token = req.headers.authorization?.slice(
      7,
      req.headers.authorization.length
    );
    const decoded: any = await decode(token || "");

    //! If  decoded didn't exist , return...
    if (!decoded) {
      return res.status(409).json({ message: "can not decode" });
    }

    //! Here get decoded data
    const data: any = await User.findOne({ username: decoded?.user?.username });
    console.log(data);

    //! This function retrun a object of include source and title
    const media = getMediaPost(req.files);

    const { Description, Location } = req.body;

    //! Here create a post and save to DB
    const post = new Post({
      media,
      description: Description,
      location: Location,
      owner: { name: data.username, profile: data.profile },
    });

    //! Here add post to user data and update user information
    const user = await User.findOneAndUpdate(
      { username: data.username },
      { $push: { posts: post } },
      { new: true }
    );

    //! Updating the following list of users who have followed this user
    updateFollowingList(data.username);

    //! save changes
    await post.save();
    await user?.save();

    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed , please try again" });
    process.exit(1);
  }
};

export default createPost;
