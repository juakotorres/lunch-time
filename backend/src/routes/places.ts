import { Router } from 'express';
import { getPlaces } from '../controllers/placesController';
import { getPlacePhoto } from '../controllers/placePhotoController';
import { getPlaceDetails } from '../controllers/placeDetailsController';

const router = Router();

router.get('/:placeId', getPlaceDetails);
router.get('/:placeId/photos/:photoId', getPlacePhoto);
router.get('/*', getPlaces);

export default router;
