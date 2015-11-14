$(document).ready(function(){
  var template = $('#table-template').html();
  var hand_template = Handlebars.compile(template);
  var placeholder = $('#content-placeholder');
  Handlebars.registerHelper('score', score);
  Handlebars.registerHelper('each_with_score_filter', sortWithScore)
  $.get("../data/data.json", function(data, status, xhr){
    var html = hand_template(data);
    placeholder.append(html);
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
