import http from "http";

import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import Auth from "./routes/Auth";
import User from "./routes/User";
import Post from "./routes/Post";
import Profile from "./routes/Profile";
import Follow from "./routes/Follow";
import Unfollow from "./routes/Unfollow";
import IsFollow from "./routes/IsFollow";
import Setting from "./routes/Setting";
import maybeYouKnow from "./routes/MYK";
import Refresh from "./routes/Refresh";

import path from "path";
import connectDB from "./DB";

dotenv.config();
const app = express();
const server = http.createServer(app);

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
app.use("/v1/myk", maybeYouKnow);
app.use("/v1/refresh", Refresh);

//? --------------------- Connect To DataBase ---------------------------
connectDB(server);
