// Movie database Ajax/API
$(function() {
    // Display movies in #nowPlaying
    let newMovies = $("#nowPlaying");

    // Build url
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
