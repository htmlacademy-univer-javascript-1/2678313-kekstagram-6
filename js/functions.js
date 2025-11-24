const checkMaxLength = function(str, numb){
  return str.length <= numb;
};

checkMaxLength('проверяемая строка', 18);

const isPalindrome = function(str){
  const myStr = str.replaceAll(' ', '').toLowerCase();
  let reverse = '';
  for(let i = myStr.length - 1; i >= 0; i--){
    reverse += myStr[i];
  }
  return reverse === myStr;
};

isPalindrome('Лёша на полке клопа нашёл ');

const getDigits = function(str){
  let resNumb = '';
  const numbToStr = str.toString();
  for(let i = 0; i < numbToStr.length; i++){
    if(!Number.isNaN(parseInt(numbToStr[i], 10))){
      resNumb += numbToStr[i];
    }
  }
  if(resNumb === ''){
    return NaN;
  }
  return Number(resNumb);
};

getDigits('А меня проверить');
