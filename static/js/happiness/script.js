function addFaceHTML() {
  return '<img src="../static/data/happiness/Neutral_Face_Emoji.png"></img>';
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

$(function(){
  var parentDiv = $('.happiness-component');

  if (parentDiv) {
    // Initialize html components
    InitializeHTMLComponents(parentDiv);
    InitializeJSComponents();
  }
});
