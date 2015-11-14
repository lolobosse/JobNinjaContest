$(document).ready(function(){
  var scoreTemplate = $('#score-template').html();
  var hand_score_template = Handlebars.compile(scoreTemplate);
  var scorePlaceholder = $('#content-placeholder');
  var bugsTemplate = $('#bugs-template').html();
  var hand_bugs_template = Handlebars.compile(bugsTemplate);
  var bugsPlaceHolder = $('#bugs-placeholder');
  Handlebars.registerHelper('score', score);
  Handlebars.registerHelper('each_with_score_filter', sortWithScore);
  Handlebars.registerHelper('bier', bier);
  Handlebars.registerHelper('defStatus', statusDefinition);
  $.get("../data/data.json", function(data, status, xhr){
    var html = hand_score_template(data);
    scorePlaceholder.append(html);
    var html2 = hand_bugs_template(data);
    bugsPlaceHolder.append(html2);
  })
});
function sortWithScore(array, opts){
  arraySorted = array.sort(function(a, b){
    if (score(a)>score(b)){
      return -1;
    }
    else if (score(a)==score(b)){
      return 0;
    }
    else{
      return 1;
    }
  });
  var output = '';
  for(var i=0, j=arraySorted.length; i<j; i++) {
    output += opts.fn(arraySorted[i]);
  }
  return output;
}
function score(tester) {
  var score = 0;
  var bugs = tester.bugs;
  var reviews = tester.reviews;
  for (var bug of bugs){
    if(bug.size){
      score += bug.size * 50;
    }
  }
  for (var review of reviews){
    score += 100;
  }
  return score;
}

function statusDefinition(integer){
  if (integer == 0){
    return "To be done";
  }
  if (integer == 1){
    return "Solved";
  }
  if (integer == 2){
    return "Will be done in next release";
  }
}

function bier(tester){
  var score = 0;
  var bugs = tester.bugs;
  var reviews = tester.reviews;
  for (var bug of bugs){
    score += 1;
  }
  for (var review of reviews){
    score += 1;
  }
  return score;
}
