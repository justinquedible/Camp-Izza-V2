import { Camp_Week, Group } from "../models/models";

export function filterAndSortWeeksCurrentYear(weeks: Camp_Week[]) {
  return sortWeeks(filterWeeksCurrentYear(weeks));
}

export function sortWeeks(weeks: Camp_Week[]) {
  return weeks.sort((a, b) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
}

export function filterWeeksCurrentYear(weeks: Camp_Week[]) {
  const currentYear = new Date().getFullYear();
  return weeks.filter((week) => new Date(week.start).getFullYear() === currentYear);
}

export function sortGroups(groups: Group[]) {
  const groupNames = ["Dates", "Coconuts", "Trees", "Young Leaders"];
  const sortedGroups: Group[] = [];
  for (let groupName of groupNames) {
    groups
      .filter((group) => group.name.startsWith(groupName))
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((group) => {
        sortedGroups.push(group);
      });
  }
  return sortedGroups.concat(groups.filter((group) => group.name.startsWith("Waitlist")));
}
