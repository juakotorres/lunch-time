import { Request, Response } from 'express';
import { fetchPlaceDetails } from '../services/placeDetailsService';

export async function getPlaceDetails(req: Request, res: Response): Promise<void> {
  const { placeId } = req.params;

  if (!placeId) {
    res.status(400).json({ error: 'placeId is required' });
    return;
  }

  try {
    const data = await fetchPlaceDetails(placeId.toString());
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Place Details data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
