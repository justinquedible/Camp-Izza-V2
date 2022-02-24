// Utility functions for handling date and time
// dateTime refers to the datetime string that gets returned from SQl queries
// e.g. "Mon, 27 Jun 2022 09:00:00 GMT"

export function dateTimeToTime(dateTime: string) {
  // Example: Mon, 27 Jun 2022 09:00:00 GMT --> 9:00AM
  const militaryTime = dateTime.substring(17, 22);
  const hour = parseInt(militaryTime.substring(0, 2));
  if (hour < 12) {
    return `${hour}:${militaryTime.substring(3, 5)} AM`;
  } else {
    return `${hour - 12}:${militaryTime.substring(3, 5)} PM`;
  }
}

export function dateTimeToMilitaryTime(dateTime: string) {
  // Example: Mon, 27 Jun 2022 09:00:00 GMT --> 09:00:00
  return new Date(dateTime.substring(0,25)).toTimeString().substring(0, 8);
}

export function dateTimeToDateInput(dateTime: string) {
  // Example: Mon, 27 Jun 2022 09:00:00 GMT --> 2022-06-27
  return new Date(dateTime).toISOString().substring(0, 10);
}

export function dateTimeToDate(dateTime: string) {
  // Example: Mon, 27 Jun 2022 09:00:00 GMT --> Mon, 27 Jun 2022
  return dateTime.substring(0, 16);
}

export function dateTimeToDateTimeInput(dateTime: string) {
  // Example: Mon, 27 Jun 2022 09:00:00 GMT --> 2022-06-27T09:00
  return new Date(dateTime).toISOString().substring(0, 16);
}
