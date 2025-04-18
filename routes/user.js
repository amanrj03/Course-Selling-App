const { Router, response } = require("express");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const userRouter = Router();
const { userModel } = require("../db");
const JWT_SECRET = "ilovepavitra";

userRouter.post("/signup", async function (req, res) {
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
  await userModel.create({
    email: email,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
  });
  res.json({
    message: "You are signed up",
  });
});

userRouter.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await userModel.findOne({
        email: email
    })

    if(!response){
        res.status(403).json({
            message: "User does not exist"
        })
        return;
    }

    const passwordMatch = await bcrypt.compare(password, response.password);

    if(passwordMatch){
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);
        
        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            message: "signed in"
        })
    }
});

userRouter.get("/purchases", function (req, res) {});

module.exports = {
  userRouter: userRouter,
};
