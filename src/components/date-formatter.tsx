type DateFormat = "default" | "long" | "short" | "time";

export function formatDate(
  date: string | number | Date,
  format: DateFormat = "default",
  locale = "en-UK"
) {
  let options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  switch (format) {
    case "long":
      options = { year: "numeric", month: "long", day: "numeric" };
      break;
    case "short":
      options = { month: "short", day: "numeric" };
      break;
    case "time":
      options = { hour: "2-digit", minute: "2-digit" };
      break;
  }

  try {
    return new Date(date).toLocaleString(locale, options);
  } catch (e) {
    console.error(e);
    return "";
  }
}
