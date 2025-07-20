import express from 'express';
import router from '@/routes/router';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/stations')

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api',router)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
