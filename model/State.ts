import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  stateId: { type: String, required: true },
  name: { type: String, required: true },
  countryId: { type: String, required: true },
});
const State = mongoose.model("State", stateSchema);
module.exports = State;
