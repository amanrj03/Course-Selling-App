const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use("/app/v1/user", userRouter);
app.use("/app/v1/admin", adminRouter);
app.use("/app/v1/course", courseRouter);

app.listen(3000);
