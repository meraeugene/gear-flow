export function getReturnDate(days: number) {
  const today = new Date();
  const returnDate = new Date(today);
  returnDate.setDate(today.getDate() + 7 + days); // 7 days for arrival + rental days

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };

  return returnDate.toLocaleDateString("en-US", options);
}
