// PSEUDOCODING:

// OBJECTIVE: This is a Streaming Movie Finder app that takes the user search input for streaming movies and pulls from the OMDB API to display the following information:

    // Movie name, poster, genre, plot, rating, reviews, runtime, release date, etc.

    // Limited input field (only searches for movies: "That's not a movie.")

// It also pulls from the Rutelly API to display the following information:
    
    // Where to find the movie streaming and other movie suggestions


// SITE LAYOUT:

// CONTAINER 1: // Title: "Where To Stream?"

// Under the title, there is a "Movie Search" input field.
// Below there are [#] hard-coded buttons (depending on name length) of popular movies.



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
// Create [#] hard-coded buttons for popular movies.



// CONTAINER 2: //

// Create 2 columns:

// Column 1: Create AJAX call to OMDB for movie genre, plot, rating, reviews, runtime, release date, etc.
// Column 2: Create a movie poster box for OMDB data response to be displayed at the far right side.



// CONTAINER 3:

// Create 3 columns:

// Column 1: Create a "Service" column (Hulu, Netflix, Prime, Vudu)
// Column 2: Create a "Where To View Streaming" column to display movie title.
// Column 3: Create a "Price" column to display "(free/$)."




// THE FOLLOWING CODE WAS COPIED FROM CLASS EXERCISE:
      // // Initial array of movies
      // var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

      // // displayMovieInfo function re-renders the HTML to display the appropriate content
      // function displayMovieInfo() {

      //   var movie = $(this).attr("data-name");
      //   var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

      //   // Creating an AJAX call for the specific movie button being clicked
      //   $.ajax({
      //     url: queryURL,
      //     method: "GET"
      //   }).then(function(response) {

      //     // Creating a div to hold the movie
      //     var movieDiv = $("<div class='movie'>");

      //     // Storing the rating data
      //     var rating = response.Rated;

      //     // Creating an element to have the rating displayed
      //     var pOne = $("<p>").text("Rating: " + rating);

      //     // Displaying the rating
      //     movieDiv.append(pOne);

      //     // Storing the release year
      //     var released = response.Released;

      //     // Creating an element to hold the release year
      //     var pTwo = $("<p>").text("Released: " + released);

      //     // Displaying the release year
      //     movieDiv.append(pTwo);

      //     // Storing the plot
      //     var plot = response.Plot;

      //     // Creating an element to hold the plot
      //     var pThree = $("<p>").text("Plot: " + plot);

      //     // Appending the plot
      //     movieDiv.append(pThree);

      //     // Retrieving the URL for the image
      //     var imgURL = response.Poster;

      //     // Creating an element to hold the image
      //     var image = $("<img>").attr("src", imgURL);

      //     // Appending the image
      //     movieDiv.append(image);

      //     // Putting the entire movie above the previous movies
      //     $("#movies-view").prepend(movieDiv);
      //   });

      // }

      // // Function for displaying movie data
      // function renderButtons() {

      //   // Deleting the movies prior to adding new movies
      //   // (this is necessary otherwise you will have repeat buttons)
      //   $("#buttons-view").empty();

      //   // Looping through the array of movies
      //   for (var i = 0; i < movies.length; i++) {

      //     // Then dynamicaly generating buttons for each movie in the array
      //     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      //     var a = $("<button>");
      //     // Adding a class of movie-btn to our button
      //     a.addClass("movie-btn");
      //     // Adding a data-attribute
      //     a.attr("data-name", movies[i]);
      //     // Providing the initial button text
      //     a.text(movies[i]);
      //     // Adding the button to the buttons-view div
      //     $("#buttons-view").append(a);
      //   }
      // }

      // // This function handles events where a movie button is clicked
      // $("#add-movie").on("click", function(event) {
      //   event.preventDefault();
      //   // This line grabs the input from the textbox
      //   var movie = $("#movie-input").val().trim();

      //   // Adding movie from the textbox to our array
      //   movies.push(movie);

      //   // Calling renderButtons which handles the processing of our movie array
      //   renderButtons();
      // });

      // // Adding a click event listener to all elements with a class of "movie-btn"
      // $(document).on("click", ".movie-btn", displayMovieInfo);

      // // Calling the renderButtons function to display the intial buttons
      // renderButtons();