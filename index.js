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
// function getWeather(lat, long) {
// 	// Grab #weather section to display weather information
// 	let weatherSection = document.getElementById("weather");

// 	// Build output in empty string
// 	let output = "";

// 	// Clear previous output
// 	weatherSection.innerHTML = "";

// 	// Set location to Orlando, FL
// 	let lat = 28.5384;
// 	let long = -81.3789;

// 	// Build url string to call API
// 	let apiKey = "d5019f52f2aed7178c00da6f7c77cde3";
// 	let imgUrlStart = "http://openweathermap.org/img/wn/";
// 	let imgUrlEnd = "@2x.png";
// 	let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;

// 	// XMLHttpRequest object
// 	let xhr = new XMLHttpRequest();
// 	// add an event listener for load event on the object
// 	xhr.addEventListener("load", function(){
// 		// for successful response, display weather
// 		if(this.status == 200){
// 			// log response to console
// 			// console.log(this.response);
			
// 			// used to calculate actual date from ms given as date/time by the API
// 			let ms = this.response.dt * 1000;
// 			let date = new Date(ms);
			
// 			ms = this.response.sys.sunrise * 1000;
// 			let rise = new Date(ms);
			
// 			ms = this.response.sys.sunset * 1000;
// 			let set = new Date(ms);
			
// 			// to build the url for weather icon/image
// 			let iconCode = this.response.weather[0].icon;
// 			let iconUrl = `${imgUrlStart}${iconCode}${imgUrlEnd}`;
			
// 			// append to the output string
// 			output += `<h4>Today's Weather for ${this.response.name}</h4>
// 								<img src="${iconUrl}" alt="${this.response.weather[0].main}">
// 								<dl>
// 									<dt>Current Conditions:</dt>
// 									<dd>${this.response.weather[0].description}</dd>
// 									<dt>Current Temp:</dt>
// 									<dd>${Math.round(this.response.main.temp)}&deg;</dd>
// 									<dt>Local Max Temp:</dt>
// 									<dd>${Math.round(this.response.main.temp_max)}&deg;</dd>
// 									<dt>Local Min Temp:</dt>
// 									<dd>${Math.round(this.response.main.temp_min)}&deg;</dd>
// 									<dt>Sunrise:</dt>
// 									<dd>${new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'medium' }).format(rise)}</dd>
// 									<dt>Sunset:</dt>
// 									<dd>${new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'medium' }).format(set)}</dd>
// 								</dl>`;
// 			// 			// remove the class from the section that has been keeping it hidden on the page
// 			weatherSection.classList.remove("hidden");
// 			// add the class to make it display
// 			weatherSection.classList.add("display");
// 			// add the output string to that section to display our weather data from the API
// 			weatherSection.innerHTML = output;
// 		}else{
// 			// 			// display an error message in the case where we get a 401 response from the server (which indicates an error in the call)
// 			weatherSection.innerHTML = "There was an issue with your call to the Open Weather API. Check the endopint and try again.";
// 		}
// 	});
	
// 	// set expected response type
// 	xhr.responseType = "json";
	
// 	// open connection to the endpoint of the correct type
// 	xhr.open("GET", endpoint);
	
// 	// send request to the server
// 	xhr.send();	
// }