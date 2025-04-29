export const getArrivalDate = () => {
  const today = new Date();
  const arrival = new Date(today);
  arrival.setDate(today.getDate() + 7);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };

  return arrival.toLocaleDateString("en-US", options);
};
