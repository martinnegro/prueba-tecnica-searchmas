export default function createTimestampFromStringEpoch(dateString: string): Date {
  const epochInSeconds = parseInt(dateString, 10);
  const date = new Date(epochInSeconds * 1000);
  return date
}