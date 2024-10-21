import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  stateCode: { type: String, required: true },
  stateId: { type: String, required: true },
  name: { type: String, required: true },
  countryCode: { type: String, required: true },
});
const State = mongoose.model("State", stateSchema);
module.exports = State;
