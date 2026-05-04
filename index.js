// AJAX/API & SLIDESHOW/CAROUSEL & DIALOG WIDGET
// I combined three of the JS requirements into one function. 
// The Now Playing section utilizes TMDB API, JQuery Slick (image slideshow/carousel), and JQuery Dialog. 
// Site is also fully responsive so feel free to see how this section displays differently on other screen sizes.
// CURRENT DATE VARIABLES
let today = new Date();
let month = today.toLocaleString('default', { month: 'short' });
let day = today.getDate();
let dateFormat = `${month} ${day}`;

// NOW PLAYING MOVIES
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

        // console.log(data);

        // Display movie posters for movies that are now playing for the week
		for(let i = 0; i < 7; i++){
			// Start with today's date
			let movieDate = new Date(today);

			// Change date for each movie
			movieDate.setDate(today.getDate() + i);

			// Format movie date
			let movieDateFormat = new Intl.DateTimeFormat('en-US', {
				weekday: 'short',
				month: 'short',
				day: 'numeric'
			}).format(movieDate);


			// Set movie showtime
			let showtime = "9:00 PM";

			// Append to HTML
			html += `
				<div class="movie subsec" data-title="${data.results[i].title}" data-overview="${data.results[i].overview}">
					<img src="${imgUrl}${data.results[i].poster_path}" alt="${data.results[i].title}">
					<p class="movie-date">${movieDateFormat}</p>
					<p class="movie-time">${showtime}</p>
				</div>`;
		}

	    // Add the HTML string to the page
        newMovies.html(html);

		// Initialize carousel
    	$("#nowPlaying").slick({
			// Default to one movie poster for mobile
			mobileFirst: true,
        	slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,

			// Add custom arrow buttons
			prevArrow: `
				<button class="slick-prev custom-arrow" aria-label="Previous">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="#f25922" d="M7.7 235.8c-10.3 12.6-9.5 31.1 2.2 42.8l128 128c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-256c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-128 128-2.2 2.4z"/></svg>
				</button>`,
			nextArrow: `
				<button class="slick-next custom-arrow" aria-label="Next">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="#f25922" d="M249.3 235.8c10.2 12.6 9.5 31.1-2.2 42.8l-128 128c-9.2 9.2-22.9 11.9-34.9 6.9S64.5 396.9 64.5 384l0-256c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l128 128 2.2 2.4z"/></svg>
				</button>`,

			// Responsive styles
			responsive: [
				//Tablet/Laptop
				{
					breakpoint: 743,
					settings: {
						slidesToShow: 3
					}
				},

				// Desktop
				{
					breakpoint: 1439,
					settings: {
						slidesToShow: 4
					}
				}
			]
   		});

		// Dialog widget when hovering over movie poster
		$(document).on("mouseenter", "#nowPlaying .movie img", function () {
			let $movie = $(this).closest(".movie");
			
			// Get movie title and overview data
			let title = $movie.data("title");
			let overview = $movie.data("overview");
			$("#movieDialog").dialog("option", "title", title);
			$("#movieOverview").text(overview);

			// Initialize dialog
			$dialog.dialog("open");

			// Position dialog underneath hovered image
			$dialog.dialog("widget").position({
				my: "center top",
				at: "center bottom",
				of: this,
				collision: "fit"
			});
		});

		// Close dialog when mouse is no longer hovering over image
		$(document).on("mouseleave", "#nowPlaying .movie img", function () {
			$dialog.dialog("close");
		});
    });

	// Manage $dialog widget
	let $dialog = $("#movieDialog").dialog({
		autoOpen: false,
		dialogClass: "no-close",
		modal: false,
		resizable: false,
		draggable: false,
		width: 300
	});
});

// Bonus use of OpenWeatherMap API, so users can see the current weather for the drive-in theater's area
// WEATHER INFO
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
			// Get sunset time
			ms = this.response.sys.sunset * 1000;
			let set = new Date(ms);
			
			// Build url for weather icon/image
			let iconCode = this.response.weather[0].icon;
			let iconUrl = `${imgUrlStart}${iconCode}${imgUrlEnd}`;
			
			// Append to output string
			output += 
				`<div id="weatherHeading">
					<h2>Come Rain or Shine</h2>
					<h3>Weather for Today, ${dateFormat}</h3>
					<p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="#0d4c73" d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"/></svg>Orlando, FL</p>
				</div>
				<div id="weatherTemp">
					<img src="${iconUrl}" alt="${this.response.weather[0].main}">
					<p id="temp">${Math.round(this.response.main.temp)}&deg;</p>
				</div>
				<dl>
					<div class="dl-container" id="definition1">
						<dt>Current Conditions:</dt>
						<dd>${this.response.weather[0].description}</dd>
					</div>
					<div class="dl-container" id="definition2">
						<dt>Local Max Temp:</dt>
						<dd>${Math.round(this.response.main.temp_max)}&deg;</dd>
					</div>
					<div class="dl-container" id="definition3">
						<dt>Local Min Temp:</dt>
						<dd>${Math.round(this.response.main.temp_min)}&deg;</dd>
					</div>
					<div class="dl-container" id="definition4">
						<dt>Sunset:</dt>
						<dd>${new Intl.DateTimeFormat('en-US', {timeStyle: 'short' }).format(set)}</dd>
					</div>
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

// WEB STORAGE
// Event listener that stores the user's email locally and will display it back to the user, and welcomes them back on reload
document.addEventListener("DOMContentLoaded", function() {
	let form = document.querySelector("#signUp form");
	let emailInput = document.getElementById("email");
	let confirmation = document.getElementById("confirmation");

	// Event listener for form submission
	form.addEventListener("submit", function(e) {
		// Prevent default form submission
		e.preventDefault();

		// Get email input value
		let email = emailInput.value;

		// Save email to local storage
		localStorage.setItem("userEmail", email);

		// Display confirmation message
		confirmation.textContent = "Thanks! We'll send updates to ";

		// Add span element to email so it stands apart
		let span = document.createElement("span");
		span.textContent = email;
		span.classList.add("emailHighlight");

		// Add email span to confirmation message
		confirmation.appendChild(span);

		// Clear email input after submitting
		emailInput.value = "";
	});

	// Check if email exists already when page loads
	window.addEventListener("load", function() {
		let savedEmail = localStorage.getItem("userEmail");

		// Display message to welcome back user
		if (savedEmail) {
			confirmation.textContent = "Welcome back! You're subscribed with ";

			// Add span element to email so it stands apart
			let span = document.createElement("span");
			span.textContent = savedEmail;
			span.classList.add("emailHighlight");

			// Add email span to confirmation message
			confirmation.appendChild(span);
		}
	});
});