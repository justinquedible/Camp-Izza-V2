export function dateTimeToTime(dateTime: string) {
  const militaryTime = dateTime.substring(17, 22);
  const hour = parseInt(militaryTime.substring(0, 2));
  if (hour < 12) {
    return `${hour}:${militaryTime.substring(3, 5)} AM`;
  } else {
    return `${hour - 12}:${militaryTime.substring(3, 5)} PM`;
  }
}

export function dateTimeToMilitaryTime(dateTime: string) {
  return new Date(dateTime).toTimeString().substring(0, 8);
}

export function dateTimeToDateInput(dateTime: string) {
  return new Date(dateTime).toISOString().substring(0, 10);
}

export function dateTimeToDate(dateTime: string) {
  return new Date(dateTime).toDateString();
}
