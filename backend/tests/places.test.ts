import request from 'supertest';
import app from '../src/app';
import * as searchNearbyService from '../src/services/searchNearbyService';
import * as searchTextService from '../src/services/searchTextService';
import placeSearchResponseFactory from './factory/place-search-response';

describe('GET /places', () => {
  it('returns 400 if latitude or longitude parameters are missing', async () => {
    const res = await request(app).get('/places');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'lat and lng are required' });
  });

  it('returns expected mocked data when latitude and longitude are provided', async () => {
    const placeSearchResponse = placeSearchResponseFactory.build();

    jest.spyOn(searchNearbyService, 'fetchNearbyPlaces').mockResolvedValue(placeSearchResponse);

    const res = await request(app).get('/places?lat=1&lng=1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(placeSearchResponse);

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
