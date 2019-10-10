var unsplash_api = 'https://api.unsplash.com/search/photos';
var unsplash_query = '&query=';
//removed api key
var unsplash_access_key = '?client_id='
var unsplash_per_page = '&per_page=30'

var unsplash_apicall;
var pic_links = [];

var featuredPicture;
var pictureIndex = 0;

function getPhotos() {
	unsplash_query = '&query=' + city;
	unsplash_apicall = unsplash_api + unsplash_access_key + unsplash_query + unsplash_per_page;
	console.log(unsplash_apicall);
	$.getJSON(unsplash_apicall, function(data) {
		console.log("getting photos from...: " + unsplash_apicall);
		//getting 15 images
		for(var j = 0; j < 30; j++) {
			pic_links[j] = data.results[j].urls.regular;
		}
		featuredPicture = Math.round(pic_links.length/2);
	}).done(function(){
		console.log("unsplash api call successfull...");
	}).then(function(){
		setPhotos();
	});	
	createMap();
}

function setPhotos() {
	//getting middle 5 images from pic_array
	for (var i=featuredPicture-2; i <= featuredPicture+2; i++) {
		document.getElementById("pic_" + pictureIndex).setAttribute("src", pic_links[i]);
		console.log(pic_links[i]);
		pictureIndex++;
	}
	console.log("number of pics: " + pic_links[i].length);
	pictureIndex = 0;
}

//right or left scroll press
function nextPictureRight() {
	console.log("moving right...");
	//moving to the right, so initially on first click to the right, pic_links[5] will be replaced by pic_links[6]
	//loop 5 times since 5 pictures need to be replaced...
	if (featuredPicture < pic_links.length-3) {
		for(var z=featuredPicture-2;z <= featuredPicture+2;z++) {
			document.getElementById("pic_" + pictureIndex).removeAttribute("src");
			document.getElementById("pic_" + pictureIndex).setAttribute("src", pic_links[z+1]);
			pictureIndex++;
		}
		featuredPicture++;
	}
	pictureIndex = 0;
}

function nextPictureLeft() {
	console.log("moving left...");
	if (featuredPicture > 2) {
		for(var y=featuredPicture-2; y <= featuredPicture+2;y++) {
			document.getElementById("pic_" + pictureIndex).removeAttribute("src");
			document.getElementById("pic_" + pictureIndex).setAttribute("src", pic_links[y-1]);
			pictureIndex++;
		}
		featuredPicture--;
	}
	pictureIndex = 0;
}
