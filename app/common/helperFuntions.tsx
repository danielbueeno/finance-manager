const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function parseCardDate(cardName: string): Date {
  const [monthStr, yearStr] = cardName.split(" ");
  const monthIndex = monthNames.indexOf(monthStr);
  const year = parseInt(yearStr);
  return new Date(year, monthIndex);
}

export function formatCardDate(date: Date): string {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}
