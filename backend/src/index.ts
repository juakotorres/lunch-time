import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import { YelpSearchResponse } from './utils/yelp';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const YELP_API_KEY = process.env.YELP_API_KEY || '';
const BASE_URL = 'https://api.yelp.com/v3/businesses/search';

app.use(cors());
app.use(express.json());

app.get('/places', async (req: Request, res: Response) => {
  const { lat, lng, term = 'restaurant', radius = '1000', limit = '10' } = req.query;

  if (!lat || !lng) {
    res.status(400).json({ error: 'lat and lng are required' });
    return;
  }

  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lng.toString(),
    term: term.toString(),
    radius: radius.toString(),
    limit: limit.toString(),
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
        Accept: 'application/json',
      },
    });

    const data: YelpSearchResponse = (await response.json()) as YelpSearchResponse;
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error fetching Yelp API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
