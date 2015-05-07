function restoreDiary(key){
  if(localStorage.getItem(key)) {
    console.log("restoring from local storage");

    var entry = localStorage.getItem(key);
    /* appending two new lines to continue writing immediatley */
    $('#user-text').val(entry + "\n\n");

    /* trigger event to resize textarea */
    var ta = document.querySelector('textarea');
    ta.dispatchEvent(new Event('input'));

    /* scroll to bottom of the page to continue writing */
    window.scrollTo(0, document.body.scrollHeight);

  }
}

function pimpTextArea(){
  /* autoresize textarea */
	autosizeLite(document.querySelector('textarea'));

	/* add some event listeners to the textarea */
	var ta = document.querySelector('textarea');
	/* scroll to the bottom of the page if the textarea is resized for better UX */
	ta.addEventListener('autosize.resize', function(){
		window.scrollTo(0, document.body.scrollHeight);
	});
}

function setHeading(){
  $('#day').text(moment().format('dddd'));
  $('#date').text(moment().format('MM/DD/YY'));
}

function startDownload(){
  var keys = [];

  for ( var i = 0; i < localStorage.length; i++) {
    if(localStorage.key(i).substring(0 , 3) === "dd_"){
      keys.push(localStorage.key(i));
    }
  }

  console.log(keys.length +" entrie(s) found!");


  var diary = "# Diary Dash *Diary*\n";
  for( var j = 0; j < keys.length; j++){
    var key = keys[j];
    console.log(key);
    var entry = localStorage.getItem(key);

    if(entry.length > 0){
      var date = moment(key.substring(3));
      diary += "\n## " + date.format("dddd - MM/DD/YY") + "\n";
      diary += "\n" + entry + "\n";
    }

    base64 = window.btoa(diary);
    $('#Download').attr( 'href', 'data:application/octet-stream;base64,' + base64);
  }
}

function howManyEntries(){
  var noOfEntries = 0;
  for ( var i = 0; i < localStorage.length; i++) {
    if(localStorage.key(i).substring(0 , 3) === "dd_"){
      noOfEntries++;
    }
  }
  return noOfEntries;
}

function updateNoOfEntries(){
  if(howManyEntries() == 0){
    $("#Download").text("no entries");
  } else if(howManyEntries() == 1){
    $("#Download").text("one entry");
  } else {
    $("#Download").text(howManyEntries() + " entries");
  }
}

function DiaryDash( jQuery ) {
    // Code to run when the document is ready.
    setBackground();

    setHeading();

    pimpTextArea();

    updateNoOfEntries();
    $("#Download").click(startDownload);

    var today = moment().format('YYYY-MM-DD');
    var key = "dd_"+today;
    restoreDiary(key);

    /* Automatically Save users-text if changed */
    var today = moment().format('L');
    $('#user-text').bind('input propertychange', function(){
      localStorage.setItem(key, $('#user-text').val());
      updateNoOfEntries();
    });
}

$( document ).ready( DiaryDash );
