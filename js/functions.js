function parseTimeMinutes(str){
  const timeArr = str.split(':');
  return Number(timeArr[0]) * 60 + Number(timeArr[1]);
}

function IsDuringWorkingHours(startWorkday, endWorkday, meetingStart, meetingDurationInMinutes){
  const startWorkdayMinutes = parseTimeMinutes(startWorkday);
  const endWorkdayMinutes = parseTimeMinutes(endWorkday);
  const meetingStartMinutes = parseTimeMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDurationInMinutes;

  return meetingStartMinutes >= startWorkdayMinutes &&
    meetingEndMinutes <= endWorkdayMinutes;
}

IsDuringWorkingHours('08:00', '17:30', '14:00', 90);
IsDuringWorkingHours('8:0', '10:0', '8:0', 120);
IsDuringWorkingHours('08:00', '14:30', '14:00', 90);
IsDuringWorkingHours('14:00', '17:30', '08:0', 90);
IsDuringWorkingHours('8:00', '17:30', '08:00', 900);
