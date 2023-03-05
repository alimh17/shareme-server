import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import User from "../../models/User/User";
import Post from "../../models/Post/Post";

import { deleteProfileFile } from "../../utils/deleteFile";

const Setting = async (req: Request, res: Response) => {
  try {
    //! Here decoded access token and get user data
    const token = req.headers.authorization?.slice(
      7,
      req.headers.authorization.length
    );
    const decoded: any = await decode(token || "");

    //! If  decoded didn't exist , return...
    if (!decoded) {
      return res.status(404).json({ message: "User is not exist" });
    }

    const user = await User.findOne({
      username: decoded.user.username,
    });

    if (!user) {
      return res.status(404).json({ message: "User is not exist" });
    }
    const { name, lastname, bio } = req.body;

    if (req.file) {
      deleteProfileFile(decoded.user.username);

      //! update profile in post data
      await User.updateMany(
        {
          username: decoded.user.username,
        },
        { $set: { "posts.$[].owner.profile": `profile/${req.file.filename}` } }
      );

      //! update profile in Post Schema
      await Post.updateMany(
        {
          "owner.name": decoded.user.username,
        },
        {
          $set: { "owner.profile": `profile/${req.file.filename}` },
        }
      );

      //! update profile in like and comment post schema
      await Post.updateMany(
        {
          "like.username": decoded.user.username,
        },
        {
          $set: {
            "like.$.profile": `profile/${req.file.filename}`,
            "comment.$.profile": `profile/${req.file.filename}`,
          },
        }
      );

      //! update profile in like and comment user schema

      await User.updateMany(
        { "posts.like.username": decoded.user.username },
        {
          $set: {
            "posts.$[].like.$[].profile": `profile/${req.file.filename}`,
            "posts.$[].comment.$[].profile": `profile/${req.file.filename}`,
          },
        }
      );
    }

    await User.updateOne(
      {
        username: decoded.user.username,
      },
      {
        $set: {
          name,
          lastName: lastname,
          bio,
          profile: req.file
            ? `profile/${req.file.filename}`
            : decoded.user.profile,
        },
      }
    );

    const data = {
      _id: user._id,
      username: user.username,
      name,
      lastname,
      bio: bio,
      profile: req.file ? `profile/${req.file.filename}` : user.profile,
      followers: user.followers.length,
      followings: user.followings.length,
      posts: user.posts.length,
    };

    return res.status(200).json({ message: "success", data });
  } catch (err) {
    res.status(500).json({ message: "Failed , Please try again" });
  }
};

export default Setting;
