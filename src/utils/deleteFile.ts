import path from "path";
import { unlink } from "node:fs";
import User from "../models/User/User";

export const deletePostFiles = async (username: string, id: string) => {
  try {
    const user: any = await User.findOne({ username: username });

    const post = user?.posts.filter(
      (f: any) => f._id.toString() === id.toString()
    );

    post.forEach((item: any) => {
      item.media.forEach((media: any) => {
        unlink(
          path.join(__dirname, `../../public/${media.source}`),
          (err: any) => {
            if (err) {
              console.log(err);
            }
          }
        );
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteProfileFile = async (username: string) => {
  const user = await User.findOne({ username });

  unlink(path.join(__dirname, `../../public/${user?.profile}`), (err: any) => {
    if (err) {
      console.log(err);
    }
  });
};
