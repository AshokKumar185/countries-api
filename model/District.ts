import mongoose from "mongoose";
const districtSchema = new mongoose.Schema({
  districtId: { type: String, required: true },
  name: { type: String, required: true },
  stateId: {
    type: String,
    required: true,
  },
});
const District = mongoose.model("District", districtSchema);
module.exports = District;


 // stateId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "State",
  //   required: true,
  // },