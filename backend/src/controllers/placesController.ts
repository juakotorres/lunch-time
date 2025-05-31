import { Request, Response } from 'express';
import { fetchYelpPlaces } from '../services/yelpService';

export async function getPlaces(req: Request, res: Response): Promise<void> {
  const { lat, lng, term, radius, limit } = req.query;

  if (!lat || !lng) {
    res.status(400).json({ error: 'lat and lng are required' });
    return;
  }

  try {
    const data = await fetchYelpPlaces(
      lat.toString(),
      lng.toString(),
      term?.toString(),
      radius?.toString(),
      limit?.toString()
    );
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Yelp data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
