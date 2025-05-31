import { Request, Response } from 'express';
import { fetchPlacePhoto } from '../services/placePhotoService';

export async function getPlacePhoto(req: Request, res: Response): Promise<void> {
  const { placeId, photoId } = req.params;

  if (!placeId || !photoId) {
    res.status(400).json({ error: 'placeId and photoId are required' });
    return;
  }

  try {
    const data = await fetchPlacePhoto(placeId.toString(), photoId.toString());
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Place Photo data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
