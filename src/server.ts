import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const port = env.port;

mongoose
  .connect(env.mongodb_url)
  .then(() => {
    console.log("Mongoose Connected");
    app.listen(port, () => {
      console.log("Server Running on Port: " + port);
    });
  })
  .catch(console.error);
