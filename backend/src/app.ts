import express from 'express';
import cors from 'cors';
import placesRouter from './routes/places';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/places', placesRouter);

export default app;
