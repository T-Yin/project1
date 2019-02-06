// Initial array of movies:
// Calling the renderButtons function to display the intial buttons:

var movies = [
  "Mulan",
  "The Princess Bride",
  "The Lion King",
  "The Avengers"
];

var yearOmdb = [];

var viewTrailer = false;

// Calling the renderButtons function to display the intial buttons:
renderButtons();
var savedMovies = localStorage.getItem("savedMovies");
try {
  console.log(savedMovies)
  savedMovies = JSON.parse(savedMovies);
  if (Array.isArray(savedMovies)) {
    movies = savedMovies;
  }
} catch {
  console.log("There was an error")
}

renderButtons();
// var savedMovies = []

// if button is clicked, then turns true to display the movie
// if already true, then empty the display and return false
// if already false, then display movies
// var displayedMovie = false;

// This function handles events where a new movie button is clicked:
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

  // Clear forms after submission.
  $("#movie-input").val("");
  $("#year-input").val("");

  // Calling renderButtons which handles the processing of the movies array:
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn":
$(document).on("click", ".movie-btn", function () {
  var movie = $(this).attr("movie-name");

  searchOmdb(movie, function (res) {
    renderOmdb(res);

    var yearYouTube = res.Released[7] + res.Released[8] + res.Released[9] + res.Released[10];

    searchYoutube(movie, yearYouTube, function (res) {
      var videoId = res.items[0].id.videoId;
      $("#testing").attr("src", "https://www.youtube.com/embed/" + videoId);
      console.log("It works, but YouTube is being a butt.");

    });
  });
});

// This function handles events where the Clear button is clicked:
$("#clear-button").on("click", function (event) {
  // event.preventDefault();
  $("#movieInfo").empty();
  $("#posterDiv").empty();
  $("#buttons-view").empty();
  $("#movie-trailer").empty();
})

// This function handles events where the Save button is clicked:
$("#save-button").on("click", function (event) {
  // This line prevents the page from refreshing when user clicks "Save":
  event.preventDefault();

  // Clears everything stored in localStorage using localStorage.clear():
  // localStorage.clear();

  console.log(movies);
  renderButtons();

  // Stores the movie into localStorage using "localStorage.setItem":
  localStorage.setItem("savedMovies", JSON.stringify(movies));

});



function searchOmdb(query, cb) {
  if (yearOmdb.length === 0) {
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

  } else {
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
    // <div class="buttons has-addons">
    //     <span class="button">Yes</span>
    //     <span class="button">Maybe</span>
    //   </div>
    var $div = $("<div class='buttons has-addons'>")
    var a = $("<button>");
    var del = $("<button>");
    // Adding a class of "movie-btn" to the button:
    a.addClass("movie-btn button is-dark");
    del.addClass("button movie-del")
    // Adding a data-attribute called "movie-name":
    a.attr("movie-name", movies[i]);
    del.attr("data-index", i);
    // Providing the initial button text:
    a.text(movies[i]);
    del.html('<i class="far fa-trash-alt"></i>');
    // Adding the button to the buttons-view div:
    $div.append(a, del);
    $("#buttons-view").append($div);
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

  // Create element to display the movie Title.
  movieInfoDiv.append("<p class='title is-4'>" + response.Title + "</p>");

  // Creating an element to hold the plot:
  movieInfoDiv.append("<p><strong>Plot: </strong>" + response.Plot + "</p>");

  if (response.Plot === undefined) {
    $("#movieInfo").text("This is not a movie.")
  }

  // Creating an element to hold the genre:
  movieInfoDiv.append("<p><strong>Genre: </strong>" + response.Genre + "</p>");

  if (response.Genre === undefined) {
    $("#movieInfo").text("This is not a movie.")
  }

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
};

function clearDivs() {

  $("#movieInfo").empty();
  $("#posterDiv").empty();
  yearOmdb = [];

};

// This function handles events where the Trash Can icon is clicked:
$(document).on("click", ".movie-del", function (event) {
  movies.splice($(this).attr("data-index"), 1);

  renderButtons();
});

renderButtons();
