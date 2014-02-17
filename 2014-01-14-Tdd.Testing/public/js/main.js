function add(x,y){
  return x + y;
}
function sum(nums){
 var sum = 0;
 for(var i=0; i < nums.length; i++){
   sum += nums[i];
 }
 return sum;
}
function countEvens(nums){
 var totalEvens = 0;
 for(var i=0; i < nums.length; i++)
   if(nums[i] % 2 === 0)
   totalEvens ++;
 return totalEvens
}
/*function makeEvenStringsUppercase(words){
  var newWords = [];
 for(var i=0; i < words.length; i++){
   if (words[i].length % 2 === 0){
    var uppercasedWord =  words[i].toUpperCase();
     newWords.push(uppercasedWord);
   }else{
     newWords.push(words[i]);
   }
 }
 return newWords;
}*/
function makeEvenStringsUppercase(strings){
  for(var i = 0; i < strings.length; i++)
    if(strings[i].length % 2 === 0)
      strings[i] = strings[i].toUpperCase();
  return strings;
}
function sumLengthOfStrings(strings){
 return strings.split(" ").join("").length;
}
/*function makeCatWithName(name){
  var cat = {name: name};
  return cat;
}*/
function makeCatWithName(name){
    return {name:name};
}

