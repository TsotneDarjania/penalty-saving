/**
 * Adjust the SVG path by applying offsets and scaling
 * @param path - The raw SVG path as a string
 * @param offsetX - Offset to add to the X coordinates
 * @param offsetY - Offset to add to the Y coordinates
 * @param scale - Scaling factor to apply to the coordinates
 * @returns The adjusted path as a string
 */
export function adjustSVGPath(
  path: string,
  offsetX: number,
  offsetY: number,
  scale: number = 1
): string {
  return path.replace(/([ML])\s*([\d\s.,-]+)/g, (_match, command, coords) => {
    const adjustedCoords = coords
      .trim()
      .split(/\s+/)
      .map(
        (coord: string, index: number) =>
          index % 2 === 0
            ? offsetX + scale * parseFloat(coord) // Adjust X
            : offsetY + scale * parseFloat(coord) // Adjust Y
      )
      .join(" ");
    return `${command} ${adjustedCoords}`;
  });
}

export const createKey = (arr: [number, number]): string => arr.join(",");

export function calculatePercentage(part: number, total: number): number {
  return Math.floor((part / 100) * total);
}

export function getRandomIntInRange(from: number, to: number): number {
  if (from > to) {
    throw new Error(
      "Invalid range: 'from' should be less than or equal to 'to'."
    );
  }
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

export function findClosestPoint(
  points: { x: number; y: number }[],
  target: { x: number; y: number }
): { x: number; y: number } {
  let closestPoint = points[0]; // Initialize with the first point
  let minDistance = Number.MAX_VALUE; // Start with the maximum possible value

  points.forEach((point) => {
    // Calculate Euclidean distance
    const distance = Math.sqrt(
      Math.pow(point.x - target.x, 2) + Math.pow(point.y - target.y, 2)
    );

    // Update the closest point if this point is closer
    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = point;
    }
  });

  return closestPoint;
}
