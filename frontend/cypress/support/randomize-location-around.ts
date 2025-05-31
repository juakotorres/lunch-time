export function randomizeLocationAround(
  lat: number,
  lng: number,
  maxDistanceKm = 1
): { latitude: number; longitude: number } {
  // Convert maxDistanceKm to degrees
  const radiusInDegrees = maxDistanceKm / 111;

  // Choose a random angle in where we move the location
  const u = Math.random();
  const v = Math.random();
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;

  const deltaLat = w * Math.cos(t);
  const deltaLng = (w * Math.sin(t)) / Math.cos(lat * (Math.PI / 180));

  return {
    latitude: lat + deltaLat,
    longitude: lng + deltaLng,
  };
}
