import express from "express";
const router = express.Router();
const District = require("../model/District");
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import roleMiddleware from "../middleware/roleMiddleware";
import authMiddleware from "../middleware/authMiddleware";

router.post(
  "/createDistrict",
  roleMiddleware(["Admin"]),
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { name, stateId } = req.body;
      const newDistrict = new District({ districtId: uuidv4(), name, stateId });
      await newDistrict.save();
      res.status(200).json("District Created Successfully");
    } catch (error) {
      res.status(500).json({ "Error to create District": error });
      throw error;
    }
  }
);

router.get(
  "/getDistrict/:stateId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { stateId } = req.params;
      const districtData = await District.find({ stateId });
      res.status(200).json(districtData);
    } catch (error) {
      res.status(500).json({ "Error to get district data": error });
      throw error;
    }
  }
);

router.put(
  "/updateDistrict/:districtId",
  authMiddleware,
  roleMiddleware(["Admin", "Manager"]),
  async (req: Request, res: Response) => {
    try {
      const { districtId } = req.params;
      const { districtName } = req.body;
      const existDistrict = await District.findOne({ districtId });
      if (!existDistrict) {
        res.status(404).json({ message: "district not found" });
        return;
      }
      console.log(existDistrict);
      await District.findOneAndUpdate(
        { districtId },
        { name: districtName },
        { new: true }
      );

      res.status(200).json({ message: "Successfully updated the district" });
    } catch (error) {
      res.status(500).json({ "Error to update the district": error });
      throw error;
    }
  }
);

router.delete(
  "/removeDistrict/:districtId",
  authMiddleware,
  roleMiddleware(["Admin"]),
  async (req: Request, res: Response) => {
    try {
      const { districtId } = req.params;
      const existState = await District.findOne({ districtId });
      if (!existState) {
        res.status(404).json({ message: "District not Found" });
        return;
      }
      const deleteDistrict = await District.deleteOne({ districtId });
      res.status(200).json({ message: "Successfully deleted the district" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error to delete the district ${error}` });
      throw error;
    }
  }
);

module.exports = router;
