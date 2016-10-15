$( document ).ready(function() {


  var person = window.location.search.slice(8);

  var $body = $('body');

  var $layout = $(
    `<h1>Generate phrases ${decodeURI(person)} would totally say!</h1>
    <button id='generate'>Generate</button>
    <div class='quotes'></div>`
  );

  $body.append($layout);


  $('#generate').click(function(e) {
    $.get( 'data/' + person, function(data) {
      var $quote = $('<div></div>').text(data);
      $('.quotes').prepend($quote);
    });

  });


    
});
