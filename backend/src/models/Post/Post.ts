import { Schema, model } from "mongoose";
import { IUser } from "./../User/User";

export interface IPost {
  media: Array<{ source: ""; title: "" }>;
  description: string;
  like: Array<IUser>;
  comment: Array<object>;
  location: string;
  owner: string;
}

const postSchema = new Schema<IPost>({
  media: {
    type: [{ source: "", title: "" }],
    required: true,
    default: [],
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  owner: {
    type: String,
    default: "",
    required: true,
  },
  location: {
    type: String,
    default: "",
  },
  like: {
    type: [],
    default: [],
  },
  comment: {
    type: [{}],
    default: [],
  },
});

const Post = model<IPost>("Post", postSchema);

export default Post;
