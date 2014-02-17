function containsChar(word, letter){
  if (word.indexOf(letter) !== -1)
    return true;
  else
    return false;
}
//$.map($lis, function(tag){return parseFloat(tag.textContent);})
function parseTags($tags){
  return $.map($tags, function(tag){
    return parseFloat(tag.textContent);
  });
}
