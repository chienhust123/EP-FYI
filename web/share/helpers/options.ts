export const getOptionsByObj = (obj: Record<string, string>) => {
  return Object.entries(obj).map(([key, value]) => ({
    label: value,
    value: key,
  }));
};
