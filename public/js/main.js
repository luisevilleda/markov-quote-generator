$( document ).ready(function() {

  var $middleColumn = $('#middleColumn');
  var $body = $('body');

  var $title = $(
    `<div>
      <h1>Quote Generator</h1>
    </div>`
  );

  var $personForm = $(
    `<div class='panel-body' id='personForm'>
      <div>Who will you be quoting today?</div><br />
      <div class="input-group">
        <input type="text" id='personInput' class="form-control" placeholder="Name..." name='person'>
        <span class="input-group-btn">
          <button class="btn btn-secondary" type="submit" id='submitPerson'>Submit Person!</button>
        </span>
      </div>
    </div>`
  );



  //After a user sends the person they want
  var $quoteForm = $(
    `<div class='panel-body'>
      <form class='form-group'>
        Keep submitting quotes here: <br />
        <div class="input-group">
          <input type="text" id='quote' class="form-control" placeholder="Enter quote..." name="quote">
          <span class="input-group-btn">
            <button class="btn btn-secondary" id='submitQuote' type="submit">Add quote!</button>
          </span>
        </div>
      </form>
    </div>`);

  var $submitAllQuotes = $(
    `<div class='panel-body'>
      <button class='btn' id='submitAllQuotes'>Finish submitting quotes</button>
    </div>`
  );




  var $generator = $(
    `<h1>Generate phrases <span id='person'></span> would totally say!</h1>
    <button class='btn' id='generateButton'>Generate</button>
    <div class='quotes'></div>`
  );

  // $middleColumn.append($generator);



  //View controllers

  //When page loads show this
  $middleColumn.append($title).append($personForm);


    //store the person
  var person = '';
  var quotes = '';

  $body.on('click', '#submitPerson', function(e) {
    e.preventDefault();
    person = $('#personInput').val();

    //Add the quote appender
    console.log(person);
    $middleColumn.append($quoteForm);
  });

  $('#personInput').keypress(function(e){
    if (e.which == 13) {
      $('#submitPerson').click();
    }
  });

  //Quote submit
  $body.on('click', '#submitQuote', function(e) {
    e.preventDefault();
    quotes += ' ' + $('#quote').val();
    $('#quote').val('');
    $middleColumn.append($submitAllQuotes);

    console.log(quotes);
  });

  $('#quote').keypress(function(e){
    if (e.which == 13) {
      $('#submitQuote').click();
    }
  });

  $body.on('click', '#submitAllQuotes', function(e) {
    e.preventDefault();
    $middleColumn.html('');
    $middleColumn.append($generator);
    $('#person').text(person);
    $.ajax({
      type: 'POST',
      url: '/',
      data: {person: person, quotes: quotes},
      dataType: 'JSON'
    });
  });

  //Quote generate
  $body.on('click', '#generateButton', function(e) {
    e.preventDefault();

    $.get('/data/' + person, function(data) {
      console.log(data);
      $quote = $(
        `<div>${data}</div>`
        );
      $('.quotes').prepend($quote);
    });
  });
    
});





