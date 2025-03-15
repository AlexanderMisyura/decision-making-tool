export default function sanitizeDuration(duration: unknown): number {
  if (typeof duration === 'number') {
    if (duration < 5000) return 5000;
    else if (duration > 100_000) return 100_000;
  } else {
    return 10_000;
  }

  return duration;
}
