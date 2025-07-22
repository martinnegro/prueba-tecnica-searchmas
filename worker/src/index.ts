if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { startStationStatusCron } from './cron';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;
const API_URL = process.env.API_URL!;
const STATIONS_STATUS_PATH = process.env.STATIONS_STATUS_PATH!;

const STATIONS_STATUS_API_URL = `${API_URL}${STATIONS_STATUS_PATH}?${new URLSearchParams({
  client_id: process.env.CLIENT_ID!,
  client_secret: process.env.CLIENT_SECRET!
})}`;

async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[WORKER] Connected to MongoDB');
    startStationStatusCron(STATIONS_STATUS_API_URL);
  } catch (error) {
    console.error('[WORKER] Error:', error);
    process.exit(1);
  }
}

main();
