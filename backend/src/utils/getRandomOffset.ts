// To get a bit more randomness on the selection from the restaurants we added this method to move the center and get different places.
// I did not wanted to use much time here, so I asked ChatGPT here for help.

export function getRandomOffsetLocation(lat: number, lng: number, radiusInMeters: number) {
  const earthRadius = 6371000;

  const distance = Math.random() * radiusInMeters;
  const bearing = Math.random() * 2 * Math.PI;

  const lat1 = lat * (Math.PI / 180);
  const lng1 = lng * (Math.PI / 180);

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(distance / earthRadius) +
      Math.cos(lat1) * Math.sin(distance / earthRadius) * Math.cos(bearing)
  );

  const lng2 =
    lng1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(distance / earthRadius) * Math.cos(lat1),
      Math.cos(distance / earthRadius) - Math.sin(lat1) * Math.sin(lat2)
    );

  return {
    latitude: lat2 * (180 / Math.PI),
    longitude: lng2 * (180 / Math.PI),
  };
}
