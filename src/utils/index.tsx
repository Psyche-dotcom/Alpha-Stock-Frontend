export function capitalizeFirstLetter(letter: string): string {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}

export function formatDate(utcDate: string): string {
  const date = new Date(utcDate || "2025-03-07T23:40:33.987571Z");
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long", // "Monday"
    year: "numeric", // "2025"
    month: "long", // "August"
    day: "numeric", // "31"
    hour: "2-digit", // "01"
    minute: "2-digit", // "45"
    second: "2-digit", // "30"
    hour12: true, // AM/PM format
  }).format(date);
};
