import { NextFunction, Request, Response } from 'express';
import { fetchNearbyPlaces } from '../services/searchNearbyService';
import { fetchPlacesByText } from '../services/searchTextService';
import { AppError } from '../middleware/errorHandler';

export async function getPlaces(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { lat, lng, radius, type, query } = req.query;

  try {
    if (!lat || !lng) {
      throw new AppError('Latitude and longitude are required', 400);
    }

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
    next(error);
  }
}
