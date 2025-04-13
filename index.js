const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use("/app/v1/user", userRouter);
app.use("/app/v1/admin", adminRouter);
app.use("/app/v1/course", courseRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://amanketchum:czUdIvZ1zQnOTcZV@cluster0.nc9fzp4.mongodb.net/course-selling-app"
  );
  app.listen(3000);
}
main();
