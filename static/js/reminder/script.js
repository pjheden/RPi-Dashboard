function reminder_addListHTML() {
  // return '<img id="emojiImg" src="../static/data/happiness/Neutral_Face_Emoji.png"></img>';
  var listStr = '';
  listStr += '<ul class="reminder-ul"></ul>'
  return listStr;
}



function reminder_InitializeHTMLComponents(parentDiv) {
  var listEl = reminder_addListHTML();

  parentDiv.append(listEl);
}

function reminder_addToList(ele) {
  // TODO:
  // Read data from ele
  // create li
  var liStr = '<li>'+ele+'</li>';
  $('.reminder-ul').append(liStr);
}

function reminder_addCheckedListener() {
  // Add a "checked" symbol when clicking on a list item
  var list = document.querySelector('.reminder-ul');
  list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  }, false);
}


// 1. Create list
// 2. Query DB for items in list
// 3. Add such items to list



$(function(){
  var parentDiv = $('.reminder-component');

  if (parentDiv) {
    // Initialize html components
    reminder_InitializeHTMLComponents(parentDiv);

    setTimeout(function(){
      reminder_addToList('Hit the Gym');
      reminder_addToList('Hit the Gym');
      reminder_addToList('Hit the Gym');
      reminder_addToList('Hit the Gym');
      reminder_addCheckedListener();
    }, 500);

    // addCheckedListener();
  }
});
