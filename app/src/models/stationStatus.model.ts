import mongoose from "mongoose"
import { Schema } from "mongoose"

const stationStatusSchema = new Schema({
  station_id: { type: Schema.ObjectId, ref: 'Station',required: true },
  num_bikes_available: { type: Number, required: true },
  num_bikes_available_types: {
    mechanical: { type: Number, default: 0 },
    ebike: { type: Number, default: 0 }
  },
  num_bikes_disabled: { type: Number, default: 0 },
  num_docks_available: { type: Number, required: true },
  num_docks_disabled: { type: Number, default: 0 },
  last_reported: { type: Number, required: true },
  is_charging_station: { type: Boolean, default: false },
  status: { type: String, required: true },
  is_installed: { type: Boolean, default: false },
  is_renting: { type: Boolean, default: false },
  is_returning: { type: Boolean, default: false },
  traffic: { type: String, default: null }
})

export default mongoose.model("StationStatus", stationStatusSchema)