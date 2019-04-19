var catsArray = [
	"pusheen",
	"garfield",
	"felix the cat",
	"tom",
	"hello kitty",
	"scottish fold",
	"puss in boots"
];

function renderButtons() {
	$("#gif-buttons").empty();

	for (var i = 0; i < catsArray.length; i++) {
		var catButton = $("<button>");
		catButton.addClass("btn btn-dark btn-sm");
		catButton.attr("id", "catButton");
		catButton.attr("type", "button");
		catButton.attr("data-name", catsArray[i]);
		catButton.text(catsArray[i]);
		$("#gif-buttons").append(catButton);
	}
}

$("#submit").on("click", function(event) {
	event.preventDefault();
	var newCat = $("#inlineFormInput")
		.val()
		.trim();
	catsArray.push(newCat);
	renderButtons();
});

renderButtons();

function showGifs() {
	$("#GifsDisplay").empty();
	var catGif = $(this).attr("data-name");
	console.log("this is the catGif dataname: " + catGif);
	var queryURL =
		"https://api.giphy.com/v1/gifs/search?api_key=g44xg4R0MCe2b0sCo27zJkr5dS7omv5H&q=" +
		catGif +
		"&limit=10&offset=0&rating=G&lang=en";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response);
		var results = response.data;
		for (var i = 0; i < results.length; i++) {
			var catsDiv = $("<div>");
			var catImage = $("<img>");
			var gifRating = $("<p>");
			catImage.attr(
				"src",
				results[i].images.fixed_height_small_still.url
			);
			catImage.addClass("catClass");
			catImage.attr("data-state", "still");
			catImage.attr(
				"data-still",
				results[i].images.fixed_height_small_still.url
			);
			catImage.attr(
				"data-animate",
				results[i].images.fixed_height_small.url
			);
			gifRating.addClass("rating");
			gifRating.text("rating: " + results[i].rating);

			catsDiv.append(catImage, gifRating);
			$("#GifsDisplay").append(catsDiv);
			console.log("rating: " + results[i].rating);
		}

		animateGifs();
	});
}

function animateGifs() {
	$(".catClass").on("click", function() {
		var state = $(this).attr("data-state");
		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});
}

$(document).on("click", "#catButton", showGifs);
