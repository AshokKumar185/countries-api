import express from "express";
const router = express.Router();
const District = require("../model/District");
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import roleMiddleware from "../middleware/roleMiddleware";
import authMiddleware from "../middleware/authMiddleware";


router.post("/createDistrict",
  roleMiddleware(["Admin"]),
  authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, stateId } = req.body;
    const newDistrict = new District({ districtId: uuidv4(), name, stateId });
    await newDistrict.save();
    res.status(200).json("District Created Successfully");
  } catch (error) {
    res.status(500).json({ "Error to create District": error });
    throw error;
  }
});

router.get("/getDistrict/:stateId",authMiddleware, async (req: Request, res: Response) => {
  try {
    const { stateId } = req.params;
    const districtData = await District.find({ stateId });
    res.status(200).json(districtData);
  } catch (error) {
    res.status(500).json({ "Error to get district data": error });
    throw error;
  }
});

module.exports = router;
