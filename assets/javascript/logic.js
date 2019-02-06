// PSEUDOCODING:

// OBJECTIVE: This is a Search Movie Trailer app that takes the user search input for movie trailers and pulls from the OMDB API to display the following information:

// Movie name, poster, plot, genre, reviews, runtime, rating, release date, etc.

// Limited input field (only searches for movies: "That's not a movie.")

// It also pulls from the Rutelly API to display the following information:

// Where to find the movie streaming and other movie suggestions

// SITE LAYOUT:

// CONTAINER 1: // Title: "Search Movie Trailers"

// Under the title, there is a "Search Movie Trailer" input field.
// Below there are [#] dynamically generated buttons of searched movies.

// CONTAINER 2: // 2 columns:

// Column 1: On the left side are OMDB movie info returns.
// Column 2: On the right side is a movie poster box.

// CONTAINER 3: // 3 columns:

// Column 1: "Service" (Hulu, Netflix, Prime, Vudu)
// Column 2: "Where To View Streaming" (movie title)
// Column 3: "Price" (free/$)

// INSTRUCTIONS: //

// CONTAINER 1: //

// Create Jumbotron with search input field and Search button.
// Create [#] dynamically generated buttons of searched movies.

// CONTAINER 2: //

// Create 2 columns:

// Column 1: Create AJAX call to OMDB for name, poster, plot, genre, reviews, runtime, rating, release date, etc.
// Column 2: Create a movie poster box for OMDB data response to be displayed at the far right side.

// CONTAINER 3:

// Create 3 columns:

// Column 1: Create a "Service" column (Hulu, Netflix, Prime, Vudu)
// Column 2: Create a "Where To View Streaming" column to display movie title.
// Column 3: Create a "Price" column to display "(free/$)."

// BEGIN CODING HERE:

// Initial array of movies:
var movies = [
  "Mulan",
  "The Princess Bride",
  "The Lion King",
  "The Incredibles"
];

var yearOmdb = [];
var yearEntered = false;

// if button is clicked, then turns true to display the movie
// if already true, then empty the display and return false
// if already false, then display movies
// var displayedMovie = false;

// This function handles events where a movie button is clicked:
$("#add-movie").on("click", function (event) {
  event.preventDefault();

  // This line grabs the input from the textbox:
  var movie = $("#movie-input")
    .val()
    .trim();

  var year = $("#year-input")
    .val()
    .trim();

  // Adding movie from the textbox to the movies array:
  movies.push(movie);
  yearOmdb.push(year);

  if (year === "") {
    yearEntered = false
  } else {
    yearEntered = true
  }

  // Calling renderButtons which handles the processing of the movies array:
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn":
$(document).on("click", ".movie-btn", function () {
  var movie = $(this).attr("movie-name");

  searchOmdb(movie, year, function (res) {
    renderOmdb(res);

    var year = res.Released[7] + res.Released[8] + res.Released[9] + res.Released[10];

    searchYoutube(movie, year, function (res) {
      var videoId = res.items[0].id.videoId;
      $("#testing").attr("src", "https://www.youtube.com/embed/" + videoId);

    });
  });

});

// Calling the renderButtons function to display the intial buttons:
renderButtons();

function searchOmdb(query, year, cb) {
  if (year) {

    var movieParams = {
      apikey: "trilogy",
      t: query,
      plot: "short",
      y: parseInt(yearOmdb[0])
    }

    console.log(yearOmdb);

    var queryURL =
      "https://www.omdbapi.com/?" + $.param(movieParams);

    // Creating an AJAX call for the specific movie button being clicked:
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(cb);
  } else {

    var movieParams = {
      apikey: "trilogy",
      t: query,
      plot: "short",
    }

    var queryURL =
      "https://www.omdbapi.com/?" + $.param(movieParams);

    // Creating an AJAX call for the specific movie button being clicked:
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(cb);
  }
};

function searchYoutube(query, year, cb) {

  var params = {
    key: "AIzaSyB2Kaj69ZVu97NmlZZPkSSpqof43KUG_GY",
    part: "snippet",
    maxResults: 1,
    q: query + " " + year + " official trailer",
    type: "video",
    videoEmbeddable: true
  };

  var queryURL = "https://www.googleapis.com/youtube/v3/search?" + $.param(params);
  console.log("queryURL: ", queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(cb);
}

// Function for displaying movie data:
function renderButtons() {
  // Deleting the existing movies prior to adding new movies (to avoid repeat buttons):
  $("#buttons-view").empty();

  // Looping through the array of movies:
  for (var i = 0; i < movies.length; i++) {
    // Then dynamically generating buttons for each movie in the array via jQuery needcode $("<button>") to create the beginning and end tag (<button></button>):
    var a = $("<button>");
    // Adding a class of "movie-btn" to the button:
    a.addClass("movie-btn button is-dark ");
    // Adding a data-attribute called "movie-name":
    a.attr("movie-name", movies[i]);
    // Providing the initial button text:
    a.text(movies[i]);
    // Adding the button to the buttons-view div:
    $("#buttons-view").append(a);
  }
}

// Creating searchMovie function:
function searchMovie() {
  var movie = $(this).attr("movie-name");
  var queryURL =
    "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  // Creating an AJAX call for the specific movie button being clicked:
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then();
}

function renderOmdb(response) {
  var movieInfoDiv = $("#movieInfo");

  clearDivs();

  // Creating an element to hold the plot:
  movieInfoDiv.append("<p><strong>Plot: </strong>" + response.Plot + "</p>");
  // if (response.Plot === "undefined") {

  // }

  // Creating an element to hold the genre:
  movieInfoDiv.append("<p><strong>Genre: </strong>" + response.Genre + "</p>");

  // Looping through the array of Ratings:
  for (var i = 0; i < response.Ratings.length; i++) {
    movieInfoDiv.append(
      "<p><strong>" +
      response.Ratings[i].Source +
      ": </strong>" +
      response.Ratings[i].Value +
      "</p>"
    );
  }

  // Creating an element to hold the runtime:
  movieInfoDiv.append(
    "<p><strong>Runtime: </strong>" + response.Runtime + "</p>"
  );

  // Creating an element to hold the rating:
  movieInfoDiv.append("<p><strong>Rating: </strong>" + response.Rated + "</p>");

  // Creating an element to hold the release date:
  movieInfoDiv.append(
    "<p><strong>Released: </strong>" + response.Released + "</p>"
  );

  // Storing the poster:
  var imgURL = response.Poster;
  if (imgURL === "N/A") {
    imgURL = "assets/images/image_not_found.png"
  }

  var image = $("<img>").attr("src", imgURL);

  // Appending the image to the poster div:
  $("#posterDiv").append(image);
}

function clearDivs() {

  $("#movieInfo").empty();
  $("#posterDiv").empty();
  yearOmdb = [];

}