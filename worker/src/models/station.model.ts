import mongoose from "mongoose"
import { Schema, Model } from "mongoose"

const stationSchema = new Schema({
  _id: { type: String, required: true },
  station_id: { type: String, required: true },
  name: { type: String, required: true },
  physical_configuration: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  altitude: { type: Number, default: null },
  address: { type: String, required: true },
  post_code: { type: String, default: null },
  capacity: { type: Number, required: true },
  is_charging_station: { type: Boolean, default: false },
  rental_methods: [{ type: String }],
  groups: [{ type: String }],
  obcn: { type: String, default: "" },
  short_name: { type: String, default: "" },
  nearby_distance: { type: Number, default: 1000.0 },
  _ride_code_support: { type: Boolean, default: true },
  rental_uris: {
    type: Map,
    of: String,
    default: {}
  }
})

export default mongoose.model("Station", stationSchema)