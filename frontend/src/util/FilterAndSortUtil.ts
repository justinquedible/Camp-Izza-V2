import { Camp_Week } from "../models/models";

export function filterAndSortWeeksCurrentYear(weeks: Camp_Week[]) {
  return sortWeeks(filterWeeksCurrentYear(weeks));
}

export function sortWeeks(weeks: Camp_Week[]) {
  return weeks.sort((a, b) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
}

function filterWeeksCurrentYear(weeks: Camp_Week[]) {
  const currentYear = new Date().getFullYear();
  return weeks.filter((week) => new Date(week.start).getFullYear() === currentYear);
}
