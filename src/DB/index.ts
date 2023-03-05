import mongoose from "mongoose";

const PORT = process.env.PORT || 3001;

const connectDB = (server: any) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => {
      server.listen(PORT, () => console.log(`server run on port ${PORT}`));
      console.log(`Mongodb connected ${mongoose.connection.port}`);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

export default connectDB;
