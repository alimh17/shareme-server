import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import Post from "../../models/Post/Post";
import User from "../../models/User/User";

const getMediaPost = (files: any) => {
  const media = [];
  for (const file of files) {
    media.push({ source: file.path, title: file.filename });
  }
  return media;
};

export const PostController = async (req: Request, res: Response) => {
  try {
    //! files is Requred for create post --- image or video
    if (!req.files) {
      return res.status(409).json({ message: "Please send a image or video" });
    }
    //! Here decoded access token and get user data
    const decoded = await decode(req.headers.authorization || "");

    //! If  decoded didn't exist , return...
    if (!decoded) {
      return res.status(409).json({ message: "can not decode" });
    }
    //! Here get decoded data
    const data: any = decoded;

    //! This function retrun a object of include source and title
    const media = getMediaPost(req.files);

    const { Description, Location } = req.body;

    //! Here create a post and save to DB
    const post = new Post({
      media,
      description: Description,
      locaion: Location,
      owner: data.user.username,
    });

    //! Here add post to user data and update user information
    const user = await User.findOneAndUpdate(
      { username: data.user.username },
      { $push: { posts: post } },
      { new: true }
    );

    //! save changes
    await post.save();
    await user?.save();

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
  }
};
