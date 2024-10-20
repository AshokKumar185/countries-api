import express from "express";
const router = express.Router();
const Country = require("../model/Country");
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";
router.post(
  "/createCountry",
  roleMiddleware(["Admin"]),
  authMiddleware,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const country = new Country({ name, countryId: uuidv4() });
      await country.save();
      res.status(201).json(country);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

router.get(
  "/getallCountry",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const countries = await Country.find();
      res.status(200).json(countries);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

router.put(
  "/updateCountry/:countryId",
  authMiddleware,
  roleMiddleware(["Admin", "Manager"]),
  async (req: Request, res: Response) => {
    try {
      const { countryId } = req.params;
      const { name } = req.body;
      const country = await Country.find({ countryId });
      console.log(country);
      if (country.length === 0) {
        res.status(404).json("country does not exist");
      }
      const updateCountry = await Country.findOneAndUpdate(
        { countryId },
        { name },
        { new: true }
      );
      res.status(200).json({
        message: "Successfully updated the country",
        data: updateCountry,
      });
    } catch (error) {
      res.status(200).json({ "Error to update the Country": error });
      throw error;
    }
  }
);

router.delete(
  "/deleteCountry/:countryId",
  authMiddleware,
  roleMiddleware(["Admin"]),
  async (req: Request, res: Response) => {
    try {
      const { countryId } = req.params;
      const country = await Country.find({ countryId });
      if (!country) {
        res.status(403).json("Country does not exist");
      }
      const deleteCountry = await Country.deleteOne({ countryId });
      res
        .status(200)
        .json({ "Sucessfully Deleted the Country": deleteCountry });
    } catch (error) {
      res.status(500).json({ "Error to Delete the Country": error });
      throw error;
    }
  }
);

module.exports = router;
