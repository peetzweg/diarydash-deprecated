function setBackground(){
	/* How many background images on the server */
	var NoOfImages = 62;
	var today = moment().format("l");

	/* check if bgNo is set */
	if(localStorage["bgNo"] == undefined){
		console.log("Seems to be the first visit, setting some config variables");
		localStorage["bgNo"] = 18;
		localStorage["lastVisit"] = today;
	}

	/* retrieve old background number */
	var bgNo = localStorage["bgNo"];
	var lastVisit = localStorage["lastVisit"];

	/* check if last visit was today */
	if(lastVisit != today){
		console.log("New Day, new Image!");

		bgNo++;
		if(bgNo > NoOfImages){
			bgNo = 1;
		}

		localStorage["bgNo"] = bgNo;
		localStorage["lastVisit"] = today;
	}

	/* determine screen height */
	var screenWidth = window.screen.height;
	var res = "";
	if(screenWidth > 1080){
	} else if(screenWidth > 640){
		res="_1080";
	} else {
		res="_640";
	}


	/* prepare Image String which is set as background */
	/* add addtional zero at the beginning because the images have 3 digits */
	var imgString = "0";
	/* add addtional zero if chose image has only 1 digit */
	if(bgNo.toString().length == 1){
		imgString += "0";
	}

	/* bring everything together, appending the resolution to use and jpg suffix */
	imgString += bgNo + res + ".jpg";

	/* finally set background image */
	$("body").css("background-image", "url(images/"+imgString+")");
}
