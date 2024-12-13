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
