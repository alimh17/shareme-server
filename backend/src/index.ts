import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import Auth from "./routes/Auth";
import Post from "./routes/Post";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser("secret"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../public/profile")));

const PORT = process.env.PORT || 3001;

//? ---------------------- Routes -----------------------------------------
app.use("/auth/v1/", Auth);
app.use("/post/v1/", Post);

//? --------------------- Connect To DataBase ---------------------------
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost:27017/shareme" as string)
  .then(() => {
    app.listen(PORT, () => console.log(`server run on port ${PORT}`));
    console.log(`Mongodb connected ${mongoose.connection.port}`);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
