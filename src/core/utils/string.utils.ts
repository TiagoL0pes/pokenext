export const Capitalize = (str: string): string => {
  if (!str) return "";

  if (str.trim().length === 2) {
    return str.toUpperCase();
  }

  return str
    .trim()
    .split("-")
    .map((value: string) => value.slice(0, 1).toUpperCase() + value.slice(1))
    .join(" ");
};