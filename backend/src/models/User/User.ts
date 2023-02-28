import { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  profile: string;
  bio: string;
  posts: Array<object>;
  followers: Array<object>;
  followings: Array<object>;
  chatList: Array<object>;
  createdAt: Date;
  breathday: Date;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    default: "",
  },
  email: {
    type: String,
    required: true,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  profile: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },

  posts: {
    type: [{}],
    default: [],
  },
  followers: {
    type: [{}],
    default: [],
  },
  followings: {
    type: [{}],
    default: [],
  },
  chatList: {
    type: [
      {
        name: String,
        username: {
          type: String,
          unique: true,
        },
        avatar: String,
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  breathday: Date,
});

const User = model<IUser>("User", userSchema);

export default User;
