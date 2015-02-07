$(document).ready(function(){
 
	var today = new Date();

	/* choosing todays background */
	var numImages = 13;
	var d = today.getDate();
	while(d > numImages){
		d -= numImages;
	}
	$("body").css("background-image", "url(images/"+d+".jpg)");

	/* setting heading for today's entry */	
	var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
	$('#date').text(today.toLocaleDateString('en-EN', options));

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
