// Movie database Ajax/API
$(function() {
    // Display movies in #nowPlaying
    let newMovies = $("#nowPlaying");

    // Build url string to call API
    let imgUrl = `https://image.tmdb.org/t/p/w400/`;
	let urlStart = `https://api.themoviedb.org/3/movie/now_playing?api_key=`;
	let apiKey = "29a35dc8cab40ae08a7a02f5afc84cfb";
	let urlEnd = `&language=en-US&page=1`;

    // Make Ajax call
    $.ajax({
		// Set the url and type of response expected from API
		url: `${urlStart}${apiKey}${urlEnd}`,
		dataType: "json"
		
		// How JSON data from API is handled with successful response
	}).done(function(data){
		// Build output in empty string
		let html = "";

        console.log(data);

        // Display movie posters for movies that are now playing
		for(let i = 0; i < 7; i++){
			html += `
				<section class="movie subsec">
					<img src="${imgUrl}${data.results[i].poster_path}" alt="${data.results[i].title}">
				</section>`;
		}

	    // Add the HTML string to the page
        newMovies.html(html);
    });
});

// Weather API
function getWeather() {
	// Grab #weather section to display weather information
	let weatherSection = document.getElementById("weather");

	// Build output in empty string
	let output = "";

	// Clear previous output
	weatherSection.innerHTML = "";

	// Set location to Orlando, FL
	let lat = 28.5384;
	let long = -81.3789;

	// Build url string to call API
	let apiKeyWeather = "d5019f52f2aed7178c00da6f7c77cde3";
	let imgUrlStart = "http://openweathermap.org/img/wn/";
	let imgUrlEnd = "@2x.png";
	let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKeyWeather}`;

	// XMLHttpRequest object
	let xhr = new XMLHttpRequest();

	// Event listener for load event on the object
	xhr.addEventListener("load", function(){
		// For successful response, display weather
		if(this.status == 200){
			// Get current date
			let today = new Date();
			let month = today.toLocaleString('default', { month: 'short' });
			let day = today.getDate();
			let dateFormat = `${month} ${day}`;
			
			// Get sunset time
			ms = this.response.sys.sunset * 1000;
			let set = new Date(ms);
			
			// Build url for weather icon/image
			let iconCode = this.response.weather[0].icon;
			let iconUrl = `${imgUrlStart}${iconCode}${imgUrlEnd}`;
			
			// Append to output string
			output += 
				`<h2>Come Rain or Shine</h2>
				<h3>Weather for Today, ${dateFormat}</h3>
				<p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="#0d4c73" d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"/></svg>Orlando, FL</p>
				<div>
					<img src="${iconUrl}" alt="${this.response.weather[0].main}">
					<p id="temp">${Math.round(this.response.main.temp)}&deg;</p>
				</div>
				<dl>
					<dt>Current Conditions:</dt>
					<dd>${this.response.weather[0].description}</dd>
					<dt>Local Max Temp:</dt>
					<dd>${Math.round(this.response.main.temp_max)}&deg;</dd>
					<dt>Local Min Temp:</dt>
					<dd>${Math.round(this.response.main.temp_min)}&deg;</dd>
					<dt>Sunset:</dt>
					<dd>${new Intl.DateTimeFormat('en-US', {timeStyle: 'short' }).format(set)}</dd>
				</dl>`;

			// Add the output string to #weather section to display weather data
			weatherSection.innerHTML = output;
		}else{
			// Display error message if API data fails to load
			weatherSection.innerHTML = "There was an issue with your call to the Open Weather API. Check the endopint and try again.";
		}
	});
	
	// Expected response type
	xhr.responseType = "json";
	
	// Open connection to endpoint of correct type
	xhr.open("GET", endpoint);
	
	// Send request to server
	xhr.send();	
}

// Call getWeather function
getWeather();