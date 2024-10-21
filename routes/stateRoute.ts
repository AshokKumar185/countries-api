import express from "express";
const router = express.Router();
const State = require("../model/State");

import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import roleMiddleware from "../middleware/roleMiddleware";
import authMiddleware from "../middleware/authMiddleware";
import { generateCode } from "../generateCode/generate";

router.post(
  "/createState",
  roleMiddleware(["Admin"]),
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { name, countryCode } = req.body;
      const stateCode = generateCode(name);
      const newState = new State({
        stateId: uuidv4(),
        name,
        countryCode,
        stateCode,
      });
      await newState.save();
      res.status(200).json("State Created Successfully");
    } catch (error) {
      res.status(500).json({ "Error to create State": error });
      throw error;
    }
  }
);

router.get(
  "/getState/:countryCode",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { countryCode } = req.params;
      const stateData = await State.find({ countryCode });
      console.log(stateData);
      res.status(200).json(stateData);
    } catch (error) {
      res.status(500).json({ "Error to get state data": error });
      throw error;
    }
  }
);

router.put(
  "/updateState/:stateId",
  authMiddleware,
  roleMiddleware(["Admin", "Manager"]),
  async (req: Request, res: Response) => {
    try {
      const { stateId } = req.params;
      const { stateName } = req.body;
      const existState = await State.findOne({ stateId });
      if (!existState) {
        res.status(404).json({ message: "state not found" });
        return;
      }
      console.log(existState);
      const updateState = await State.findOneAndUpdate(
        { stateId },
        { name: stateName },
        { new: true }
      );

      res.status(200).json({ message: "Successfully updated" });
    } catch (error) {
      res.status(500).json({ "Error to update the state": error });
      throw error;
    }
  }
);

router.delete(
  "/removeState/:stateId",
  authMiddleware,
  roleMiddleware(["Admin"]),
  async (req: Request, res: Response) => {
    try {
      const { stateId } = req.params;
      console.log(stateId);
      const existState = await State.findOne({ stateId });
      if (!existState) {
        res.status(404).json({ message: "State not Found" });
        return;
      }
      console.log(existState);
      await State.deleteOne({ stateId });
      res.status(200).json({ message: "Successfully deleted the state" });
    } catch (error) {
      res.status(500).json({ message: `Error to delete the State ${error}` });
      throw error;
    }
  }
);

module.exports = router;
