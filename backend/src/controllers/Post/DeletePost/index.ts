import { Types } from "mongoose";
import { Request, Response } from "express";
import { decode } from "jsonwebtoken";

import updatePostList from "./updatePostsList";
import User from "../../../models/User/User";
import { deletePostFiles } from "../../../utils/deleteFile";

const deletePost = async (req: Request, res: Response) => {
  try {
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

    if (!req.body.id) {
      res.status(409).json({ message: "Please send post id" });
    }

    const objectId = new Types.ObjectId(req.body.id);

    //! Delete posts files
    deletePostFiles(decoded.user.username, req.body.id);

    const user: any = await User.findOneAndUpdate(
      { username: decoded.user.username },
      {
        $pull: { posts: { _id: objectId } },
      },
      { new: true }
    );

    //! Updating the Posts list of users who have followed this user
    updatePostList(decoded.user.username, user.posts);

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed , please try again" });
    process.exit(1);
  }
};

export default deletePost;
