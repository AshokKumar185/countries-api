import express from "express";
const router = express.Router();
const Taluk = require("../model/Taluk");
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import roleMiddleware from "../middleware/roleMiddleware";
import authMiddleware from "../middleware/authMiddleware";

router.post(
  "/createTaluk",
  authMiddleware,
  roleMiddleware(["Admin"]),
  async (req: Request, res: Response) => {
    try {
      const { name, districtId } = req.body;
      const newTaluk = new Taluk({ talukId: uuidv4(), name, districtId });
      await newTaluk.save();
      res.status(200).json("taluk Created Successfully");
    } catch (error) {
      res.status(500).json({ "Error to create taluk": error });
      throw error;
    }
  }
);

router.get(
  "/getTaluk/:districtId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { districtId } = req.params;
      const talukData = await Taluk.find({ districtId });
      res.status(200).json(talukData);
    } catch (error) {
      res.status(500).json({ "Error to get taluk data": error });
      throw error;
    }
  }
);

module.exports = router;
