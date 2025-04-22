const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { adminModel, courseModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { JWT_ADMIN_SECRET } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async function (req, res) {
  const requireBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(100),
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
  });
  const parsdDataWithSuccess = requireBody.safeParse(req.body);

  if (!parsdDataWithSuccess.success) {
    res.json({
      message: "Inccorrect format",
      error: parsdDataWithSuccess.error,
    });
  }

  const { email, password, firstName, lastName } = req.body;

  const hashedPassword = await bcrypt.hash(password, 5);
  await adminModel.create({
    email: email,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
  });
  res.json({
    message: "You are signed up",
  });
});

adminRouter.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const admin = await adminModel.findOne({
    email: email,
  });

  if (!admin) {
    res.status(403).json({
      message: "User does not exist",
    });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: admin._id.toString(),
      },
      JWT_ADMIN_SECRET
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;

  const { title, description, price, imageUrl } = req.body;

  const course = await courseModel.create({
    title,
    description,
    price,
    imageUrl,
    creatorId: adminId,
  });

  res.json({
    message: "Course Created",
    courseId: course._id
  });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;

  const { title, description, price, imageUrl, courseId} = req.body;

  const course = await courseModel.updateOne({
    _id: courseId,
    creatorId: adminId
  },
    {
    title,
    description,
    price,
    imageUrl,
  });

  res.json({
    message: "Course Created",
    courseId: course._id
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;
  const courses = await courseModel.find({
    creatorId: adminId
  })
  res.json({
    message: "This is you all courses",
    courses
  })
});

module.exports = {
  adminRouter: adminRouter,
};
