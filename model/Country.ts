import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  countryId: { type: String, required: true },
  name: { type: String, required: true },
  countryCode: { type: String, required: true },
});

const Country = mongoose.model("Country", countrySchema);
module.exports = Country;
