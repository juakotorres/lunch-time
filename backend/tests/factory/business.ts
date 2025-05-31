import { Factory } from 'fishery';
import { Business } from '../../src/utils/yelp';

const businessFactory = Factory.define<Business>(({ sequence }) => ({
  id: `id_${sequence}`,
  alias: `id_${sequence}`,
  name: `name_${sequence}`,
  image_url: 'image_url',
  is_closed: false,
  url: `url_${sequence}`,
  review_count: 0,
  categories: [],
  rating: 5,
  coordinates: { latitude: 1, longitude: 1 },
  transactions: [],
  location: {
    address1: `address_${sequence}`,
    address2: null,
    address3: null,
    city: 'Minato',
    zip_code: '100-0002',
    country: 'Japan',
    state: 'Tokyo',
    display_address: [],
  },
  phone: '08012345678',
  display_phone: '08012345678',
  distance: 100,
}));

export default businessFactory;
