import mongoose from "mongoose";

const talukSchema = new mongoose.Schema({
  talukId: { type: String, required: true },
  name: { type: String, required: true },
  districtId: {
    type: String,
    required: true,
  },
});

const Taluk = mongoose.model("Taluk", talukSchema);

module.exports = Taluk;
