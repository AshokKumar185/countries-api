import express, { Router, Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import authMiddleware from "../middleware/authMiddleware";
const FirmModel = require("../model/FirmModel");
const Country = require("../model/Country");
const State = require("../model/State");
const District = require("../model/District");
const Taluk = require("../model/Taluk");

const router: Router = express.Router();

const createFirm = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { countryId, stateId, districtId, talukId, name } = req.body;
    const country = await Country.findOne({ countryId });
    const state = await State.findOne({ stateId });
    const district = await District.findOne({ districtId });
    const taluk = await Taluk.findOne({ talukId });
    console.log(taluk);
    if (!country || !state || !district || !taluk) {
      res.status(404).json({ error: "One or more related entities not found" });
      return;
    }

    const newFirm = new FirmModel({
      userId: uuidv4(),
      name,
      country: {
        countryId: country.countryId,
        countryName: country.name,
        countryCode: country.countryCode,
      },
      state: {
        stateId: state.stateId,
        stateName: state.name,
        stateCode: state.stateCode,
      },
      district: {
        districtId: district.districtId,
        districtName: district.name,
        districtCode: district.districtCode,
      },
      taluk: {
        talukId: taluk.talukId,
        talukName: taluk.name,
        talukCode: taluk.talukCode,
      },
    });

    await newFirm.save();
    res.status(200).json({ message: "Firm data created successfully" });
  } catch (error) {
    console.error("Error creating Firm data:", error);
    res.status(500).json({ error: "Error creating Firm data" });
  }
};

router.post("/createFirm", authMiddleware, createFirm);

module.exports = router;
