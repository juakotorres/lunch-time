import { NextFunction, Request, Response } from 'express';
import { fetchPlaceDetails } from '../services/placeDetailsService';
import { AppError } from '../middleware/errorHandler';

export async function getPlaceDetails(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { placeId } = req.params;

  try {
    if (!placeId) {
      throw new AppError('PlaceId is required', 400);
    }

    const data = await fetchPlaceDetails(placeId.toString());
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
