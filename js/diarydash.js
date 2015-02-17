$(document).ready(function(){
	var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var today = new Date();

	/* choosing todays background */
	var resolutions = [1920, 1440, 1334, 1136];

	/* determine windows width */
	var windowWidth = $(window).width();

	var resToUse = "";
	if($.inArray(windowWidth, resolutions) != -1){
		console.log("screen resolution matches available images");
		var index = $.inArray(windowWidth, resolutions);
		resToUse = "_"+resolutions[index];
	}else{
		console.log("screen resolution does not match any available image resolution");
		console.log("searching for closest match...");

		var index;
		var best = Number.MAX_VALUE;
		for (index = 0; index < resolutions.length; index++){
			var res = resolutions[index];
			var d = Math.abs(windowWidth - res);
			if(d < best){
				best = d;
				resToUse = "_"+res;
			}
		}
		console.log("best resolution found: "+resToUse);
	}

	var numImages = 31;
	var todaysImageNo = today.getDate();
	while(todaysImageNo > numImages){
		todaysImageNo -= numImages;
	}

	/* prepare Image String which is set as background */
	/* add addtional zero at the beginning because the images have 3 digits */
	var imgString = "0";

	/* add addtional zero if chose image has only 1 digit */
	if(todaysImageNo.toString().length == 1){
		imgString += "0";
	}

	/* bring everything together, appending the resolution to use and jpg suffix */
	imgString += todaysImageNo + resToUse + ".jpg"; 

	$("body").css("background-image", "url(images/"+imgString+")");

	/* setting heading for today's entry */	
	var datestring = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();

	$('#day').text(weekdays[today.getDay()]);
	$('#date').text(datestring);

	/* autoresize textarea */
	autosizeLite(document.querySelector('textarea'));

	/* add some event listeners to the textarea */
	var ta = document.querySelector('textarea');
	/* scroll to the bottom of the page if the textarea is resized for better UX */
	ta.addEventListener('autosize.resize', function(){
		window.scrollTo(0,document.body.scrollHeight);
	});
	

	/* preparing key for local Storage */
	var key = today.getFullYear().toString()+"-"+today.getMonth().toString()+"-"+today.getDate().toString();
	console.log(key);
	
/* restoring today's entry if present */
	if(localStorage[key]) {
		console.log("restoring from local storage");
		var entry = localStorage[key];
		/* appending two new lines to continue writing immediatley */
		ta.value = entry + "\n\n";

		/* trigger event to resize textarea */
		ta.dispatchEvent(new Event('input'));

		/* scroll to bottom of the page to continue writing */
		window.scrollTo(0,document.body.scrollHeight);
	}


	/* block browser hotkeys and provide my own actions */
	$(window).bind('keydown', function(event) {
		  if (event.ctrlKey || event.metaKey) {
		      switch (String.fromCharCode(event.which).toLowerCase()) {
					/* Save */
		      case 's':
							/* prevent default behaviour */
		          event.preventDefault();

							/* store value of the Textarea locally */
							localStorage[key] = ta.value;

							/* show save-alert */
		          swal({
							title: "saved",
							confirmButtonColor: "#444",
							type: "success",
							timer: 1000 });
		          break;
		      }
		  }
	});
});
