type DateFormat = "default" | "long" | "short" | "time" | "full";

export function formatDate(
  date: string | number | Date,
  format: DateFormat = "default",
  locale = "en-UK",
  showCurrentYear?: true
) {
  const inputDate = new Date(date);
  const currentYear = new Date().getFullYear();

  let options: Intl.DateTimeFormatOptions = {
    year:
      showCurrentYear || currentYear !== inputDate.getFullYear()
        ? "numeric"
        : undefined,
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  switch (format) {
    case "long":
      options = {
        year:
          showCurrentYear || currentYear !== inputDate.getFullYear()
            ? "numeric"
            : undefined,
        month: "long",
        day: "numeric",
      };
      break;
    case "short":
      options = { month: "short", day: "numeric" };
      break;
    case "time":
      break;
    case "full": {
      const dateOptions: Intl.DateTimeFormatOptions = {
        year:
          showCurrentYear || currentYear !== inputDate.getFullYear()
            ? "numeric"
            : undefined,
        month: "long",
        day: "numeric",
      };

      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };

      const datePart = inputDate.toLocaleDateString(locale, dateOptions);
      const timePart = inputDate.toLocaleTimeString(locale, timeOptions);

      return (
        <div>
          <span>{datePart}</span>
          <span className="mx-1">·</span>
          <span>{timePart}</span>
        </div>
      );
    }
  }

  try {
    return inputDate.toLocaleString(locale, options);
  } catch (e) {
    console.error(e);
    return "";
  }
}
