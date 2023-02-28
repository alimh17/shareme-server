import http from "http";

import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

import Auth from "./routes/Auth";
import User from "./routes/User";
import Post from "./routes/Post";
import Profile from "./routes/Profile";
import Follow from "./routes/Follow";
import Unfollow from "./routes/Unfollow";
import IsFollow from "./routes/IsFollow";
import Setting from "./routes/Setting";
import Comment from "./routes/Comment";
import Like from "./routes/Like";
import FollowingPage from "./routes/FollowingPage";
import maybeYouKnow from "./routes/MYK";
import Refresh from "./routes/Refresh";
import Conversations from "./routes/Conversation";
import Message from "./routes/Message";
import Search from "./routes/Search";

import path from "path";
import connectDB from "./DB";
import { CreateRandomUser, generateUser } from "./utils/faker";
import { faker } from "@faker-js/faker";
import socket from "./utils/socket";

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    // methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    // credentials: true,
  },
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser("secret"));

//? -------------------- Statick Paths ----------------------------------
app.use(express.static(path.join(__dirname, "../public")));

//? ---------------------- Routes -----------------------------------------
app.use("/v1/auth", Auth);
app.use("/v1/get-user", User);
app.use("/v1/post", Post);
app.use("/v1/profile", Profile);
app.use("/v1/follow", Follow);
app.use("/v1/unfollow", Unfollow);
app.use("/v1/isfollow", IsFollow);
app.use("/v1/setting", Setting);
app.use("/v1/comment", Comment);
app.use("/v1/like", Like);
app.use("/v1/following-page", FollowingPage);
app.use("/v1/myk", maybeYouKnow);
app.use("/v1/refresh", Refresh);
app.use("/v1/conversation", Conversations);
app.use("/v1/messages", Message);
app.use("/v1/search", Search);

//? --------------------- Socket.io --------------------------------------
socket(io);

//? --------------------- Connect To DataBase ---------------------------
connectDB(server);
// generateUser();
socket(io);
