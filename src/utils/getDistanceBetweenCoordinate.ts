/**
 * First, the function checks whether the two coordinates are equal and returns 0 if so, indicating that the distance between them is zero.

The function then converts the coordinates from degrees to radians and calculates the difference in longitude between the two coordinates. The Haversine formula is used to calculate the distance between the two points. This formula uses the law of cosines to calculate the distance between two points on a sphere, such as the Earth.

The distance is then converted to miles and then kilometers, and the result is returned as a floating point number representing the distance in kilometers between the two coordinates.
*/

export interface Coordinate {
  latitude: number
  longitude: number
}

export const getDistanceBetweenCoordinate = (
  from: Coordinate,
  to: Coordinate,
) => {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const fromRadian = (Math.PI * from.latitude) / 180
  const toRadian = (Math.PI * to.latitude) / 180

  const theta = from.longitude - to.longitude
  const radTheta = (Math.PI * theta) / 180

  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

  if (dist > 1) {
    dist = 1
  }

  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344

  return dist
}
