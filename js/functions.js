let validationString = function(str, numb){
  if(str.length <+ numb){
    return true;
  }else{
    return false;
  }
};

console.log(validationString("Hello", 5));

let palindrome = function(str){
  let myStr = str.replaceAll(" ", "").toLowerCase();
  let reverse = '';
  for(let i = myStr.length - 1; i >= 0; i--){
    reverse += myStr[i];
  }
  if(myStr === reverse){
    return true;
  }else{
    return false;
  }
}

console.log(palindrome("Лёша на полке клопа нашёл "));

let countNumberInString = function(str){
  let resNumb = '';
  let numbToStr = str.toString()
  for(let i = 0; i < numbToStr.length; i++){

    if(Number.isNaN(parseInt(numbToStr[i])) == false){
      resNumb += numbToStr[i];
    }
  }
  return resNumb;
}

console.log(countNumberInString('1 кефир, 0.5 батона'));
