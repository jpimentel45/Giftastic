
$(document).ready(function () {
    //Array for searched topics to be added
    var topics = ["Mean Girls", "Patrick Star", "Chilling Adventures of Sabrina", "Code Lyoko", "Pokemon", "Sailor Moon", "Courage The Cowardly Dog"];
    //loop through topics array to display button in buttonContainer
    function createButtons() {
        //prevent duplicate buttons
        $("#buttonContainer").empty();
        for (var i = 0; i < topics.length; i++) {
            //new element for button to be created
            var newButton = $('<button>');
            //give button id topic 
            newButton.attr("id", "topic");
            newButton.attr("data-search", topics[i]);
            newButton.text(topics[i]);
            $("#buttonContainer").append(newButton);
        }
    }

    createButtons();
    //Clicking Submit button  
    $("#addButton").on("click", function (event) {
        event.preventDefault();
        //will grab input value & trim search
        var inputText = $("#topicInput").val().trim();
        //push into topics array
        topics.push(inputText);

        $("#topicInput").val('');
        //create a button for newTopic
        createButtons();
    });
    function displayTopic() {
        // topic for giphy to "data-search"
        var topicSearch = $(this).data("search");

        var APIKey = "yBQBYcU50xilufwjAwSwbvxCahLU0ZDE"; //personal API Key

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicSearch + "&api_key=" + APIKey + "&limit=10"; //limit search to 10


        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                //create div to contain rating and gif, name it gifDiv
                var gifDiv = $("<div>");
                //can also directly create div with style or just create with id instead of 2 seperate lines of code
                gifDiv.attr("id", "gifDiv");

                var rating = results[i].rating;

                var title = $("<p>").text("Title: " + results[i].title.toUpperCase());

                title.attr("id", "title");
                //create img container for topic images
                var topicImage = $("<img>");
                //create <p> containing results[i].rating and capitalize
                var p = $("<p>").text("Rating: " + rating.toUpperCase());
                p.attr("id", "rating");
                //<img id="topicGif" srcdata Still, Animate, STate>
                topicImage.attr("id", "topicGif");
                topicImage.attr("src", results[i].images.fixed_height_still.url);
                topicImage.attr("data-still", results[i].images.fixed_height_still.url); // still image
                topicImage.attr("data-animate", results[i].images.fixed_height.url); // animated image
                topicImage.attr("data-state", "still"); // set the image state
                //append Rating to created gifDiv
                gifDiv.append(p);
                //append tittle to gifDIv
                gifDiv.append(title);
                //append gif to created gifDiv
                gifDiv.append(topicImage);
                //prepend created gifDiv to existing #gifContainer
                $("#gifContainer").prepend(gifDiv);

            }
        });
    }

    // "data-state" attribute changed to "data-animate" or "data-still"
    function gifState() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }
    //img with id "topicGif" go through gifState
    $(document).on("click", "#topicGif", gifState);
    //buttons created with id="topic" can be clicked, and go through displayTopic 
    $(document).on("click", "#topic", displayTopic);

});
//place on screen
//user click still giphy = animate
//user click again = stop playing
//under each gif display rating (PG, G, etc.)
//add form that takes value from user input box
//add it into topics array 
//then make function call that takes each topic in array and remakes buttons on page
//Bonus Goals
// Ensure your app is fully mobile responsive.
// Allow users to request additional gifs to be added to the page.
// Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.
// List additional metadata (title, tags, etc) for each gif in a clean and readable format.
// Include a 1-click download button for each gif, this should work across device types.
// Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio
// Allow users to add their favorite gifs to a favorites section.
// This should persist even when they select or add a new topic.
// If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies).