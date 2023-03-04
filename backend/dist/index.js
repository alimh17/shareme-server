"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const Auth_1 = __importDefault(require("./routes/Auth"));
const User_1 = __importDefault(require("./routes/User"));
const Post_1 = __importDefault(require("./routes/Post"));
const Profile_1 = __importDefault(require("./routes/Profile"));
const Follow_1 = __importDefault(require("./routes/Follow"));
const Unfollow_1 = __importDefault(require("./routes/Unfollow"));
const IsFollow_1 = __importDefault(require("./routes/IsFollow"));
const Setting_1 = __importDefault(require("./routes/Setting"));
const Comment_1 = __importDefault(require("./routes/Comment"));
const Like_1 = __importDefault(require("./routes/Like"));
const FollowingPage_1 = __importDefault(require("./routes/FollowingPage"));
const MYK_1 = __importDefault(require("./routes/MYK"));
const Refresh_1 = __importDefault(require("./routes/Refresh"));
const Conversation_1 = __importDefault(require("./routes/Conversation"));
const Message_1 = __importDefault(require("./routes/Message"));
const Search_1 = __importDefault(require("./routes/Search"));
const path_1 = __importDefault(require("path"));
const DB_1 = __importDefault(require("./DB"));
const socket_1 = __importDefault(require("./utils/socket"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
        // methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        // credentials: true,
    },
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)("secret"));
app.use((0, express_session_1.default)({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
//? -------------------- Statick Paths ----------------------------------
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
//? ---------------------- Routes -----------------------------------------
app.use("/v1/auth", Auth_1.default);
app.use("/v1/get-user", User_1.default);
app.use("/v1/post", Post_1.default);
app.use("/v1/profile", Profile_1.default);
app.use("/v1/follow", Follow_1.default);
app.use("/v1/unfollow", Unfollow_1.default);
app.use("/v1/isfollow", IsFollow_1.default);
app.use("/v1/setting", Setting_1.default);
app.use("/v1/comment", Comment_1.default);
app.use("/v1/like", Like_1.default);
app.use("/v1/following-page", FollowingPage_1.default);
app.use("/v1/myk", MYK_1.default);
app.use("/v1/refresh", Refresh_1.default);
app.use("/v1/conversation", Conversation_1.default);
app.use("/v1/messages", Message_1.default);
app.use("/v1/search", Search_1.default);
//? --------------------- Socket.io --------------------------------------
(0, socket_1.default)(io);
//? --------------------- Connect To DataBase ---------------------------
(0, DB_1.default)(server);
// generateUser();
(0, socket_1.default)(io);
