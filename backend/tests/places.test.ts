import request from 'supertest';
import app from '../src/app';
import * as yelpService from '../src/services/yelpService';
import yelpSearchResponseFactory from './factory/yelp-reponse';

describe('GET /places', () => {
  it('returns 400 if latitude or longitude parameters are missing', async () => {
    const res = await request(app).get('/places');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'lat and lng are required' });
  });

  it('returns expected mocked data when latitude and longitude are provided', async () => {
    const placeList = yelpSearchResponseFactory.build();

    jest.spyOn(yelpService, 'fetchYelpPlaces').mockResolvedValue(placeList);

    const res = await request(app).get('/places?lat=1&lng=1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(placeList);

    (yelpService.fetchYelpPlaces as jest.Mock).mockRestore();
  });
});
