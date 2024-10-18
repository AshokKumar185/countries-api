import express from "express";
const router = express.Router();
const State = require("../model/State");

import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import roleMiddleware from "../middleware/roleMiddleware";
import authMiddleware from "../middleware/authMiddleware";

router.post(
  "/createState",
  roleMiddleware(["Admin"]),
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { name, countryId } = req.body;
      const newState = new State({ stateId: uuidv4(), name, countryId });
      await newState.save();
      res.status(200).json("State Created Successfully");
    } catch (error) {
      res.status(500).json({ "Error to create State": error });
      throw error;
    }
  }
);

router.get(
  "/getState/:countryId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { countryId } = req.params;
      const stateData = await State.find({ countryId });
      res.status(200).json(stateData);
    } catch (error) {
      res.status(500).json({ "Error to get state data": error });
      throw error;
    }
  }
);

module.exports = router;
