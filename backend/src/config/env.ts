import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3001;
export const API_KEY = process.env.API_KEY || '';
export const PLACES_API = process.env.PLACES_API || '';
