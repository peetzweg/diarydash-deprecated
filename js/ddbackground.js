$(document).ready(function(){
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

	/* finally set background image */
	$("body").css("background-image", "url(images/"+imgString+")");
});
