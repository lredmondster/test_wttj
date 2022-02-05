// in miliseconds
const units: { [unit: string]: number } = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const rtf = new Intl.RelativeTimeFormat("fr", { numeric: "always" });

const getRelativeTime = (d1: Date, d2 = new Date()) => {
  const elapsed = d1.getTime() - d2.getTime();

  for (const [unit, number] of Object.entries(units)) {
    if (Math.abs(elapsed) > number || unit == "second")
      return rtf.format(
        Math.round(elapsed / number),
        unit as Intl.RelativeTimeFormatUnit,
      );
  }
};

export default getRelativeTime;
