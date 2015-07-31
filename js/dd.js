function restoreDiary(key){
  if(localStorage.getItem(key)) {
    console.log("restoring from local storage");

    var entry = localStorage.getItem(key);
    /* appending two new lines to continue writing immediatley */
    $('#entry').val(entry);

    /* trigger event to resize textarea */
    var ta = document.querySelector('textarea');
    ta.dispatchEvent(new Event('input'));

    /* scroll to bottom of the page to continue writing */
    window.scrollTo(0, document.body.scrollHeight);
  }
}

function pimpTextArea(){
  /* get the textarea */
  var ta = document.querySelector('textarea');

  /* autoresize textarea */
	autosizeLite(document.querySelector('textarea'));

	/* add some event listeners to the textarea */
	/* scroll to the bottom of the page if the textarea is resized for better UX */
	ta.addEventListener('autosize.resize', function(){
		window.scrollTo(0, document.body.scrollHeight);
	});
}

function setHeading(){
  $('#day').text(moment().format('dddd'));
  $('#date').text(moment().format('MMMM Do, YYYY'));
}

function getEntryKeys(){
  var keys = [];

  for ( var i = 0; i < localStorage.length; i++) {
    if(localStorage.key(i).substring(0 , 3) === "dd_"){
      keys.push(localStorage.key(i));
    }
  }
  keys.sort(compareKeys).reverse();

  return keys
}

function startDownloadMD(){
  var keys = getEntryKeys()

  var diary = "# *Diary Dash* Diary\n";
  for( var j = 0; j < keys.length; j++){
    var key = keys[j];
    var entry = localStorage.getItem(key);

    if(entry != undefined){
      var date = moment(key.substring(3));
      diary += "\n## " + date.format("dddd - MM/DD/YY") + "\n";
      diary += "\n" + entry + "\n";
    }
  }
  base64 = window.btoa(diary);
  $('#DownloadButton').attr( 'href', 'data:text/plain;base64,' + base64);
  $('#DownloadButton').attr( 'download', "diary_"+moment().format('YYYY-MM-DD')+".md");

}

function startDownloadPDF(){

  var keys = getEntryKeys()

  var diary = []
  for( var k = 0; k < keys.length; k++){
    var key = keys[k];
    var entry = localStorage.getItem(key);

    if(entry != undefined){
      var date = moment(key.substring(3));
      diary.push({ text: date.format("dddd"), style: 'heading'});
      diary.push({ text: date.format("MMMM Do, YYYY"), style: 'subheading'});
      diary.push({ text: entry, style: 'entry', pageBreak: 'after'});
    }
  }

  // define new font, which is included in the vfs_fonts.js file
  pdfMake.fonts = {
    baskerville: {
      normal: 'LibreBaskerville-Regular.ttf',
      bold: 'LibreBaskerville-Bold.ttf',
      italics: 'LibreBaskerville-Italic.ttf',
      bolditalics: 'LibreBaskerville-Bold.ttf'

    }
  };

  var docDefinition = {
      pageSize: 'A5',
      pageMargins: [ 20, 30, 20, 30 ], // in inch as far as I know
      content: diary,
      footer: function(currentPage, pageCount) {
        return { text: currentPage.toString(), alignment: (currentPage % 2) ? 'left' : 'right', margin: [ 20, 10, 20, 30 ] };
      },
      defaultStyle: {
          font: 'baskerville'
      },
      styles: {
        heading: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        subheading: {
          fontSize: 16,
          italics: true,
          alignment: 'center'
        },
        entry: {
          fontSize: 14
        }
      }
    };

  pdfMake.createPdf(docDefinition).open();
}

/* compares dd keys, used for sort algorithm */
function compareKeys(a, b) {
  a = a.split("_")[1].split("-");
  b = b.split("_")[1].split("-");

  var aYear = parseInt(a[0]);
  var aMonth = parseInt(a[1]);
  var aDay = parseInt(a[2]);

  var bYear = parseInt(b[0]);
  var bMonth = parseInt(b[1]);
  var bDay = parseInt(b[2]);

  /* check year */
  if (aYear > bYear) {
    return 1;
  } else if (aYear < bYear){
    return -1;
  }
  /* check month */
  else {
    if(aMonth > bMonth){
      return 1;
    } else if (aMonth < bMonth){
      return -1;
    }
    /* check day */
    else {
      if (aDay > bDay){
        return 1;
      } else if (aDay < bDay) {
        return -1;
      }
    }
  }
  // a must be equal to b
  return 0;
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
      $("#PageNumber").text("no entries");
  } else if(howManyEntries() == 1){
      $("#PageNumber").text("one entry");
  } else {
    $("#PageNumber").text(howManyEntries() + " entries");
  }
}

function DiaryDash( jQuery ) {
    // Code to run when the document is ready.
    setBackground();

    /* if enrty element is available */
    if($('#entry').length){
      setHeading();
      pimpTextArea();
      updateNoOfEntries();

      /* add download function to DownloadButton */
      $("#DownloadButton").click(startDownloadPDF);

      var today = moment().format('YYYY-MM-DD');
      var key = "dd_"+today;
      restoreDiary(key);

      /* Automatically Save entry if changed */
      var today = moment().format('L');
      $('#entry').bind('input propertychange', function(){
        localStorage.setItem(key, $('#entry').val());
        updateNoOfEntries();
      });
    }
}

$( document ).ready( DiaryDash );
