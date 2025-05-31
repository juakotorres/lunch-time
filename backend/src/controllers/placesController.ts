import { Request, Response } from 'express';
import { fetchNearbyPlaces } from '../services/searchNearbyService';
import { fetchPlacesByText } from '../services/searchTextService';

export async function getPlaces(req: Request, res: Response): Promise<void> {
  const { lat, lng, radius, type, query } = req.query;

  if (!lat || !lng) {
    res.status(400).json({ error: 'lat and lng are required' });
    return;
  }

  try {
    if (query && query !== '') {
      const data = await fetchPlacesByText(
        lat.toString(),
        lng.toString(),
        query.toString(),
        type?.toString(),
        radius ? parseFloat(radius?.toString()) : undefined
      );
      res.status(200).json(data);
    } else {
      const data = await fetchNearbyPlaces(
        lat.toString(),
        lng.toString(),
        type?.toString(),
        radius ? parseFloat(radius?.toString()) : undefined
      );
      res.status(200).json(data);
    }
  } catch (error) {
    console.error('Error fetching Places data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
