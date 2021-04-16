import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import connectDB from './config/db';
import routes from './routes';

dotenv.config();

const { API_PORT, CLIENT_URL } = process.env;

const app = express();

const corsOptions = {
  origin: [CLIENT_URL as string],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

connectDB();

if (require.main === module) {
  try {
    app.listen(API_PORT, () => {
      console.warn(`API server listening on port ${API_PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
