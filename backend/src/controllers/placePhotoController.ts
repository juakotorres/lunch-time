import { NextFunction, Request, Response } from 'express';
import { fetchPlacePhoto } from '../services/placePhotoService';
import { AppError } from '../middleware/errorHandler';

export async function getPlacePhoto(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { placeId, photoId } = req.params;

  try {
    if (!placeId || !photoId) {
      throw new AppError('PlaceId and photoId are required', 400);
    }
    const data = await fetchPlacePhoto(placeId.toString(), photoId.toString());
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
