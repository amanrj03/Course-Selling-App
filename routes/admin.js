const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { adminModel } = require("../db");

adminRouter.post("/signup", function (req, res) {});

adminRouter.post("/signin", function (req, res) {});

adminRouter.post("/course", function (req, res) {});

adminRouter.put("/course", function (req, res) {});

adminRouter.get("/course/bulk", function (req, res) {});

module.exports({
  adminRouter: adminRouter,
});
