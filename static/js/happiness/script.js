function addFaceHTML() {
  return '<img id="emojiImg" src="../static/data/happiness/Neutral_Face_Emoji.png"></img>';
}

function addTextHTML() {
  return '<p>Hur glad är du idag?</p>'
}

function addScaleHTML() {
  htmlScale = '<div id="slider"> \
                <div id="custom-handle" class="ui-slider-handle"></div>\
              </div>';
  return htmlScale
}

function addScaleJS() {
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
        resetTimeout();
        updateEmoji();
      }
    });
}

function InitializeHTMLComponents(parentDiv) {
  var faceEl = addFaceHTML();
  var textEl = addTextHTML();
  var scaleEl = addScaleHTML();

  parentDiv.append(faceEl + textEl + scaleEl);
}

function InitializeJSComponents() {
  addScaleJS();
}

function resetTimeout(){
  if (SAVE_TIMEOUT) {
    clearTimeout(SAVE_TIMEOUT);
  }
  SAVE_TIMEOUT = setTimeout(function(){
    saveScore();
  }, SAVE_DELAY);
}

function saveScore() {
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

function updateEmoji() {
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
    InitializeHTMLComponents(parentDiv);
    InitializeJSComponents();
  }
});
