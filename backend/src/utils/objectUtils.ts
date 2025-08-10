export function getUpdatedFields<T>(
  original: T,
  incoming: Partial<T>
): Partial<T> {
  const updated: Partial<T> = {};

  for (const key in incoming) {
    if (
      incoming[key] !== undefined &&
      String(incoming[key]).trim() !== String(original[key]).trim()
    ) {
      updated[key] = incoming[key];
    }
  }

  return updated;
}


export function processBooleanField(value: string): boolean {
  if (value === "true") return true;
  if (value === "false") return false;
  return Boolean(value);
}