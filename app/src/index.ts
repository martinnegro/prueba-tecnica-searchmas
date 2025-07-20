if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}
import express from 'express';
import router from '@/routes/router';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/stations')
.then(() => {
  console.log('Connected to MongoDB');

  const app = express();
  const PORT = process.env.PORT || 3030;

  app.use(express.json());
  app.use('/api',router);

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
})
