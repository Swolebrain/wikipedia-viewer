const $ = require('jquery');
//en.wikipedia.org/wiki
//Special:ApiSandbox

const formLi = (wikiElement) => {
  return `<li wiki-url='${wikiElement.fullurl}'>
      <h1>${wikiElement.title}</h1>
      <p>${wikiElement.extract}</p>
      </li>`;
};

const getPages = (query, element) => {
  $("#search").css("margin-top", "20px");
  element.html("");
  $.getJSON("http://en.wikipedia.org/w/api.php?action=query&format=json&"+
    "prop=info%7Cextracts&pageids=&generator=search&"+
    "inprop=url&exlimit=10&exintro=1&callback=?&gsrsearch="+query)
  .then((res,txt,xhr)=>{
    console.log(res);
    for (var k in res.query.pages)
      element.append(formLi(res.query.pages[k]));
  });
};

$(document).keyup((e)=>
    e.keyCode!=13?"":getPages($("#search").val(),$("#results")));

$("#results").on("click", "li", function(e){
  window.location.href = $(this).attr("wiki-url");
});
