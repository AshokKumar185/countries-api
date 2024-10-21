import mongoose, { Schema, Document } from "mongoose";

interface IFirm extends Document {
  userId: string;
  name: string;
  country: {
    countryId: string;
    countryName: string;
    countryCode: string; // Add countryCode
  };
  state: {
    stateId: string;
    stateName: string;
    stateCode: string; // Add stateCode
  };
  district: {
    districtId: string;
    districtName: string;
    districtCode: string; // Add districtCode
  };
  taluk: {
    talukId: string;
    talukName: string;
  };
}

const firmSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    country: {
      countryId: { type: String, required: true },
      countryName: { type: String, required: true },
      countryCode: { type: String, required: true },
    },
    state: {
      stateId: { type: String, required: true },
      stateName: { type: String, required: true },
      stateCode: { type: String, required: true },
    },
    district: {
      districtId: { type: String, required: true },
      districtName: { type: String, required: true },
      districtCode: { type: String, required: true },
    },
    taluk: {
      talukId: { type: String, required: true },
      talukName: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const FirmModel = mongoose.model<IFirm>("FirmMaster", firmSchema);

module.exports = FirmModel;
