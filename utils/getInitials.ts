export const getInitials = (name: string) => {
  const words = name.trim().split(" ");
  const first = words[0]?.[0] || "";
  const last = words[words.length - 1]?.[0] || "";
  return (first + last).toUpperCase();
};
