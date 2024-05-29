/**
 * Converts a number of seconds to a time string
 * in the format "HH:MM:SS" or "MM:SS" if hour < 1.
 * e.g. 3908 -> "01:05:08" or 308 -> "05:08"
 */
export function secToTime(seconds: number): string {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Convert numbers to strings and pad with zeros if necessary
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  if (hours > 0) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedMinutes}:${formattedSeconds}`;
}
