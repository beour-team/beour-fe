export const over30Days = (dateString: string) => {
  const today = new Date();
  const reservationDate = new Date(dateString);
  const diffTime = today.getTime() - reservationDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays > 30;
};
