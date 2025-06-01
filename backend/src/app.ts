import express from 'express';
import cors from 'cors';
import placesRouter from './routes/places';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/places', placesRouter);
app.use(errorHandler);

export default app;
