// Giphy API Key: Wmowk73oEjiCgiZeGWDSiSZ3sxUZP282


//initial array of NBA players
var playerInput = ["larry bird", "magic johnson", "bill russell"];


//function to create player buttons
function renderButtons() {


	//deletes buttons in div
	$("#button-div").empty();

	//loop through the playerInput array
	for (var i = 0; i < playerInput.length; i++) {

		//dynamically generate buttons for each player in the array
		var a = $("<button>");

		//add a class
		a.addClass("basketball-button btn btn-default btn-lg");

		//add data-attribute with the value of the player at index i
		a.attr("data-player", playerInput[i]);

		//add text with the value of the player at index i
		a.text(playerInput[i]);

		//appending the button to the HTML
		$("#button-div").append(a);
	}
}	

//on click to handle submission button
$("#addNBAPlayer").on("click", function(event) {

	//prevents form from trying to submit itself
	event.preventDefault();

	//grab text from input box
	var userInput = $("#user-input").val().trim();

	//push user inputted player into the array
	playerInput.push(userInput);

	//call back render button function
	renderButtons();


//click handler listening for player button clicks(not for the submit button)
$(".basketball-button").on("click", function() {

	$("#NBA-gifs-here").empty();

//creates variable that stores the button clicked player data
var player = $(this).attr("data-player");
console.log(player);

//construct queryURL using the player name
var queryURL = "https:api.giphy.com/v1/gifs/search?q=" + player + "&api_key=Wmowk73oEjiCgiZeGWDSiSZ3sxUZP282&limit=8";

//AJAX request with query URL
$.ajax({
	url: queryURL,
	method: "GET"
})

//--> after you recieve response back from the API
.then(function(response) {
	console.log(queryURL);

	console.log(response);

//storing the data from the AJAX request in a variable
	var results = response.data;

//loop through results
	for (var i = 0; i < results.length; i++) {

		//creating a div for the GIF to go into
		var playerDiv = $('<div>');

		//creating a p tag for the GIF rating to go into
		var p = $("<p>").text("Rating: " + results[i].rating);

		//creating an img tag and storing it in a variable
		var playerImage = $("<img>");

		//setting src attribute to the image property pulled from results object
		playerImage.attr("src", results[i].images.fixed_height_still.url);
		playerImage.attr("still", results[i].images.fixed_height_still.url);
		playerImage.attr("animated", results[i].images.fixed_height.url);
		playerImage.attr("data-state", "still");
		playerImage.addClass("gif");

		//appends the p and img tag to the playerDiv
		playerDiv.append(p);
		playerDiv.append(playerImage);

		
		$("#NBA-gifs-here").append(playerDiv);
		
	}
	
		//on click to animate the gif
	$(".gif").on("click", function() {

		// variable that holds the current state of the gif
		var state = $(this).attr("data-state");

		//if else statement to toggle the "state" of the gif from still to animated and back
		if (state === "still") {

			$(this).attr("src", $(this).attr("animated"));
			$(this).attr("data-state", "animated");
		}
		else {

			$(this).attr("src", $(this).attr("still"));
			$(this).attr("data-state", "animated");
		}

	})
	// $("#NBA-gifs-here").attr("id", "bigDiv");
});




});



});












