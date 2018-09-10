function happiness_addFaceHTML() {
  return '<img id="emojiImg" class = "happiness-img" src="../static/data/happiness/Neutral_Face_Emoji.png"></img>';
}

function happiness_addTextHTML() {
  return '<p>Hur glad är du idag?</p>'
}

function happiness_addScaleHTML() {
  htmlScale = '<div id="slider"> \
                <div id="custom-handle" class="ui-slider-handle"></div>\
              </div>';
  return htmlScale
}

function happiness_addScaleJS() {
  var handle = $( "#custom-handle" );
  $( "#slider" ).slider({
      range: "max",
      min: 1,
      max: 10,
      value: 5,
      create: function() {
        handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        handle.text( ui.value );
        happiness_resetTimeout();
        happiness_updateEmoji();
      }
    });
}

function happiness_initializeHTMLComponents(parentDiv) {
  var faceEl = happiness_addFaceHTML();
  var textEl = happiness_addTextHTML();
  var scaleEl = happiness_addScaleHTML();

  parentDiv.append(faceEl + textEl + scaleEl);
}

function happiness_initializeJSComponents() {
  happiness_addScaleJS();
}

function happiness_resetTimeout(){
  if (SAVE_TIMEOUT) {
    clearTimeout(SAVE_TIMEOUT);
  }
  SAVE_TIMEOUT = setTimeout(function(){
    happiness_saveScore();
  }, SAVE_DELAY);
}

function happiness_saveScore() {
  var val = $( "#slider" ).slider("value");

  var promise = Promise.resolve(
    $.ajax({
      url: 'http://localhost:8081/save_happiness',
      data: JSON.stringify({
        value: val
      }),
      contentType: 'application/json;charset=UTF-8',
      type: 'POST',
    })
  );
  promise.then(function(resp) {
    console.log('save happiness response', resp);
  });
}

function happiness_updateEmoji() {
  var val = $( "#slider" ).slider("value");
  // #emojiImg
  var emojiUrl = "../static/data/happiness/"
  switch (val) {
    case 1:
    case 2:
      emojiUrl += "Crying_Face_Emoji.png";
      break;
    case 3:
    case 4:
      emojiUrl += "Confused_Face_Emoji.png";
      break;

    case 6:
    case 7:
      emojiUrl += "Slightly_Smiling_Face_Emoji.png";
      break;
    case 8:
    case 9:
    case 10:
      emojiUrl += "Smiling_Emoji_with_Smiling_Eyes.png";
      break;

    default:
        emojiUrl += "Neutral_Face_Emoji.png";
      break;
  }

  $('#emojiImg').attr('src', emojiUrl);
}

var SAVE_TIMEOUT;
var SAVE_DELAY= 3000; //TODO: set a better value after testing

$(function(){
  var parentDiv = $('.happiness-component');

  if (parentDiv) {
    // Initialize html components
    happiness_initializeHTMLComponents(parentDiv);
    happiness_initializeJSComponents();
  }
});
