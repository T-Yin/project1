// Initial array of movies:
var movies = [
  "Mulan",
  "The Princess Bride",
  "The Lion King",
  "The Avengers"
];

var yearOmdb = [];

// Calling the renderButtons function to display the intial buttons:
renderButtons();

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
    key: "AIzaSyBOp-oU8Xo9CqxzHoxX8w3UN30z1DhtiFA",
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

  // Create element to display the movie Title.
  movieInfoDiv.append("<p class='title is-4'>" + response.Title + "</p>");

  // Creating an element to hold the plot:
  movieInfoDiv.append("<p><strong>Plot: </strong>" + response.Plot + "</p>");

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

$(document).ready(function() {

  // Gets the video src from the data-src on each button
  
  var $videoSrc;  
  $('.video-btn').click(function() {
      $videoSrc = $(this).data( "src" );
  });
  console.log($videoSrc);
  
    
    
  // when the modal is opened autoplay it  
  $('#myModal').on('shown.bs.modal', function (e) {
      
  // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
  $("#video").attr('src',$videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" ); 
  })
    
    
  // stop playing the youtube video when I close the modal
  $('#myModal').on('hide.bs.modal', function (e) {
      // a poor man's stop video
      $("#video").attr('src',$videoSrc); 
  }) 
      
      
  
  
    
    
  // document ready  
  });
  
  
  