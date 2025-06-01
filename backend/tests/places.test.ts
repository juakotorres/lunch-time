import request from 'supertest';
import app from '../src/app';
import * as searchNearbyService from '../src/services/searchNearbyService';
import * as searchTextService from '../src/services/searchTextService';
import placeSearchResponseFactory from './factory/place-search-response';

describe('GET /places', () => {
  it('returns expected mocked data when latitude and longitude are provided', async () => {
    const placeSearchResponse = placeSearchResponseFactory.build();

    jest.spyOn(searchNearbyService, 'fetchNearbyPlaces').mockResolvedValue(placeSearchResponse);

    const res = await request(app).get('/places?lat=1&lng=1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(placeSearchResponse);

    (searchNearbyService.fetchNearbyPlaces as jest.Mock).mockRestore();
  });

  it('returns 400 when latitude or longitude is missing', async () => {
    const res = await request(app).get('/places?lat=1');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: {
        message: 'Latitude and longitude are required',
        code: 'BAD_REQUEST',
      },
    });
  });

  it('returns 500 when an internal error occurs in fetchNearbyPlaces', async () => {
    jest.spyOn(searchNearbyService, 'fetchNearbyPlaces').mockImplementation(() => {
      throw new Error('Error in Places API');
    });

    const res = await request(app).get('/places?lat=1&lng=1');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: {
        message: 'Error in Places API',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });

    (searchNearbyService.fetchNearbyPlaces as jest.Mock).mockRestore();
  });

  it('returns expected mocked data when query is provided', async () => {
    const placeSearchResponse = placeSearchResponseFactory.build();

    jest.spyOn(searchTextService, 'fetchPlacesByText').mockResolvedValue(placeSearchResponse);

    const res = await request(app).get('/places?lat=1&lng=1&query=restaurant');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(placeSearchResponse);

    (searchTextService.fetchPlacesByText as jest.Mock).mockRestore();
  });
});
