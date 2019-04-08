
var proxy = 'https://cors-anywhere.herokuapp.com/'
var weather_api = 'api.openweathermap.org/data/2.5/';
var weather_find = 'find?';
var weather_apikey = '&appid=c032c1ba2b577366fc471735aa34fc1a';
var city;
var country;
var weather_units = '&units=imperial';
var weather_apicall;
var latitude;
var longitude;

var current_temp;
var humidity;
var temp_min;
var temp_max;
var wind_speed;
var weather_type;

function getWeather() {
	if (city == null) {
		removeSearchGlass();
	}

	city = document.getElementById('city').value;
	country = document.getElementById('country').value;
	weather_apicall = proxy + weather_api + weather_find + 'q=' + city + ',' + country + weather_units + weather_apikey;
	console.log("getting weather from...: " + weather_apicall);

	$.getJSON(weather_apicall, function(data) {
		current_temp = data.list[0].main.temp;
		humidity = data.list[0].main.humidity;
		temp_min = data.list[0].main.temp_min;
		temp_max = data.list[0].main.temp_max;
		wind_speed = data.list[0].wind.speed;
		weather_type = data.list[0].weather[0].description;
		latitude = data.list[0].coord.lat;
		longitude = data.list[0].coord.lon;
	}).done(function(){
		console.log("weather api call successfull...");
	}).then(function(){
		setWeather();
		getPhotos();
		makeDivsVisible();
	});
}

function setWeather() {
	document.getElementById("weather_label").innerHTML = "Weather in " + city + ", " + country;
	document.getElementById("weather_type").innerHTML  = "Condition: " + weather_type;
	document.getElementById("current_temp").innerHTML  = "Temperature: " + Math.round(current_temp) + "°";
	document.getElementById("max_temp").innerHTML 	   = "High: " + Math.round(temp_max) + "°";
	document.getElementById("min_temp").innerHTML 	   = "Low: " + Math.round(temp_min) + "°";
	document.getElementById("wind_speed").innerHTML    = "Wind: " + Math.round(wind_speed) + " mph";
	document.getElementById("humidity").innerHTML 	   = "Humidity: " + Math.round(humidity) + "%";
}

function makeDivsVisible() {
	document.getElementById('pictures_div').setAttribute("style", "display:inline;");
	document.getElementById('weather_div').setAttribute("style", "background-color: rgba(255, 255, 255, 0.5);height:35vh;box-shadow: 0 0.3vh 0.3vw 0 rgba(0, 0, 0, 0.4), 0 4px 4px 0 rgba(0, 0, 0, 0.4); border-radius: 5px;display:inline;");
	document.getElementById('map_div').setAttribute("style", "display:inline;	background-color: rgba(0, 0, 0, 0.3);height:35vh;box-shadow: 0 0.3vh 0.3vw 0 rgba(0, 0, 0, 0.4), 0 4px 4px 0 rgba(0, 0, 0, 0.25);");
}

function removeSearchGlass() {
	var divToRemove = document.getElementById('initialSearch_div');
	divToRemove.parentNode.removeChild(divToRemove);
	createSearchButton();
}

function createSearchButton() {
	var searchButton = document.createElement('button');
	searchButton.setAttribute("style", "margin-left:1vw;background-color:white;border-radius:5px;border-style:none;height:3vh;box-shadow: 0 0.3vh 0.3vw 0 rgba(0, 0, 0, 0.4), 0 3px 3px 0 rgba(0, 0, 0, 0.4);margin-bottom:0.5vh;");
	searchButton.innerHTML = "Search";
	searchButton.setAttribute("onclick", "getWeather();");
	document.getElementById("search").appendChild(searchButton);
}

