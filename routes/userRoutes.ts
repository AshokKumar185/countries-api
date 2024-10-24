import express, { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import jwt from "jsonwebtoken";
import authenticateToken from "../authenticateToken/authenticateToken";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";
const User = require("../model/User");
const dotenv = require("dotenv");

dotenv.config();

router.post(
  "/register",
  authMiddleware,
  roleMiddleware(["Admin"]),
  async (req: Request, res: Response) => {
    try {
      const { username, password, role } = req.body;
      console.log(username);
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const user = new User({ username, password: hashedPassword, role });
      console.log(user);
      await user.save();
      console.log("User saved successfully");
      res.status(200).json("User registered successfully");
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
    }
  }
);

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ error: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

router.post("/login", login);

router.get(
  "/userDetails",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        res.status(404);
      }
      const id = user._id;
      const findUser = await User.findOne({ _id: id });
      res.json(findUser);
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.sendStatus(500);
    }
  }
);
module.exports = router;
