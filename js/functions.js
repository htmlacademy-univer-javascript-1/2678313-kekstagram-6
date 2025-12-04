// const checkMaxLength = function(str, numb){
//   return str.length <= numb;
// };

// checkMaxLength('проверяемая строка', 18);

// const isPalindrome = function(str){
//   const myStr = str.replaceAll(' ', '').toLowerCase();
//   let reverse = '';
//   for(let i = myStr.length - 1; i >= 0; i--){
//     reverse += myStr[i];
//   }
//   return reverse === myStr;
// };

// isPalindrome('Лёша на полке клопа нашёл ');

// const getDigits = function(str){
//   let resNumb = '';
//   const numbToStr = str.toString();
//   for(let i = 0; i < numbToStr.length; i++){
//     if(!Number.isNaN(parseInt(numbToStr[i], 10))){
//       resNumb += numbToStr[i];
//     }
//   }
//   if(resNumb === ''){
//     return NaN;
//   }
//   return Number(resNumb);
// };

// getDigits('А меня проверить');

function parseTimeMinutes(str){
  const timeArr = str.split(':');
  return Number(timeArr[0]) * 60 + Number(timeArr[1]);
}

function IsDuringWorkingHours(startWorkday, endWorkday, meetingStart, meetingDurationInMinutes){
  return parseTimeMinutes(meetingStart) >= parseTimeMinutes(startWorkday) &&
    (parseTimeMinutes(meetingStart) + meetingDurationInMinutes) <= parseTimeMinutes(endWorkday);
}

IsDuringWorkingHours('08:00', '17:30', '14:00', 90);
IsDuringWorkingHours('8:0', '10:0', '8:0', 120);
IsDuringWorkingHours('08:00', '14:30', '14:00', 90);
IsDuringWorkingHours('14:00', '17:30', '08:0', 90);
IsDuringWorkingHours('8:00', '17:30', '08:00', 900);
