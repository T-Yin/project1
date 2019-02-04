var movies = [""];

// Creating an AJAX call for the specific movie button being clicked
function searchMovie() {

    var movie = $(this).attr("movie-name");
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)
        var movieInfoDiv = $("#movieInfo");

        // Display Plot
        var plot = response.Plot;
        movieInfoDiv.append("<p><strong>Plot: </strong>" + response.Plot + "</p>");

        // Display Genre
        var genre = response.Genre;
        movieInfoDiv.append("<p><strong>Genre: </strong>" + response.Genre + "</p>");

        // Display Reviews
        for (var i = 0; i < response.Ratings.length; i++) {
            movieInfoDiv.append("<p><strong>" + response.Ratings[i].Source + ": </strong>" + response.Ratings[i].Value + "</p>");
        }

        // Display Runtime
        var runtime = response.Runtime;
        movieInfoDiv.append("<p><strong>Runtime: </strong>" + response.Runtime + "</p>");

        // Display Rating
        var rating = response.Rated;
        movieInfoDiv.append("<p><strong>Rating: </strong>" + rating + "</p>");

        // Display Release Date
        var releaseDate = response.Released;
        movieInfoDiv.append("<p><strong>Released: </strong>" + response.Released + "</p>");

        // Display Poster
        var imgURL = response.Poster;
        var image = $("<img>").attr("src", imgURL);
        // Appending the image to appropriate poster div.
        $("#posterDiv").append(image);

    })

};

// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("movie-btn");
        // Adding a data-attribute
        a.attr("data-name", movies[i]);
        // Providing the initial button text
        a.text(movies[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a movie button is clicked
$("#add-movie").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();

    // Adding movie from the textbox to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".movie-btn", displayMovieInfo);
