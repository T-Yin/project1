// PSEUDOCODING:

// OBJECTIVE: Create a Streaming Movie Finder app that searches for streaming movies.

// HOW IT WORKS: User inputs their movie search & the app retrieves the following info:

// movie title
// movie trailer
// price
// where to view movie streaming
// other movie suggestions

// The app also has a limited search input field (only searches for movies: "That's not a movie.")

// Utelly API needs to pull user input & return the following info:

// movie title
// movie trailer
// price
// where to view movie streaming
// other movie suggestions



// Creating an AJAX call for the specific movie button searched for:

var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=";


// Creating an AJAX call for the specific movie selection:
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
}