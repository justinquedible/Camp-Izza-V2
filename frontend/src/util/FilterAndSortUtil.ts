import { Camp_Week } from "../models/models";

export function filterAndSortWeeks(weeks: Camp_Week[]) {
  const currentYear = new Date().getFullYear();
  weeks = weeks.filter((week) => new Date(week.start).getFullYear() === currentYear);
  return weeks.sort((a, b) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
}
