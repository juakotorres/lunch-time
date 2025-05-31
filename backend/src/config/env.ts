import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3001;
export const YELP_API_KEY = process.env.YELP_API_KEY || '';
