//Liri takes the following commands   
//  my-tweets
//  spotify-this-song
//  movie-this
//  do-what-it-says

var env = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);
var imdb = require("imdb-api");
var request = require("request");
var fs = require("fs");

//spotify  
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


// Take in the command line arguments   works!
var command = process.argv[2];

// Create an empty string for holding the song/movie command
var songmovie = '';

// Capture all the words in the song/movie (again ignoring the first three Node arguments)
for (var i = 3; i < process.argv.length; i++) {

  // Build a string with the songmovie.
  songmovie += process.argv[i] + ' ';
}

// Spotify
if (command === "spotify-this-song") {

  console.log("You Searched For: " + songmovie);
  //search spotify
  spotify.search({
    type: 'track',
    query: songmovie,
    limit: 1
  }, function (err, data) {
    if (err) {
      //err doesn't work yet
      console.log("You Searched For: The Sign" + "/n");
      console.log("Artist: Ace of Base");
      console.log("Song Title: I Saw the Sign");
      console.log("Preview Link of Song: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
      console.log("Album: The Sign (US Album) [Remastered]");
    }

    var info = data.tracks.items[0];
    console.log("Artist: " + info.artists[0].name);
    console.log("Song Title: " + info.name);
    console.log("Preview Link of Song: " + info.external_urls.spotify);
    console.log("Album: " + info.album.name);
  });
}

//twitter  (not working yet)

if (command==="my-tweets"){
    var params = {
        screen_name: 'JenniferL1921',
        count: 20,
        result_type: 'recent',
    };

    client.get('statuses/user_timeline', params, function (err, data, response) {

        if (!err) {

            for (let i = 0; i < data.statuses.length; i++) {

                let id = { id: data.statuses[i].id_str }

                console.log(JSON.stringify(data.statuses[i].user.screen_name));
                console.log(JSON.stringify(data.statuses[i].created_at, null, 10));
                console.log(data.statuses[i].text)
            }
        }
    });
  }
  

  if(command === 'my-tweets') {
    console.log("Last 20 Tweets!");
  }

  //IMDB movies  works!

  if(command==="movie-this") {
// run the request module on a URL with a JSON

request("http://www.omdbapi.com/?t=" + songmovie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

// If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    // Then we print out the imdbRating
    console.log("The movie's title is: " + JSON.parse(body).Title);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("The year the movie came out is: " + JSON.parse(body).Released);
    console.log("The Rotten Tomatoes Rating of the movie is: " + JSON.parse(body).Ratings[0].Value);
    console.log("The Country where the movie was produced is: " + JSON.parse(body).Country);
    console.log("The Language of the movie is: " + JSON.parse(body).Language);
    console.log("The Plot of the movie is: " + JSON.parse(body).Plot);
    console.log("The Actors in the movie are: " + JSON.parse(body).Plot);
  }

  if (songmovie === undefined) {
    console.log ("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/, It's on Netflix!")} 
});
}

//Do What It Says (grab text from random.txt and use it to run spotify-this-song command)  doesn't work yet

// This block of code will read from the random.txt file
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log("node liri.js " + data);

});

     
//It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
//Feel free to change the text in that document to test out the feature for other commands.
 
   
  
/*   

### BONUS

* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

* Make sure you append each command you run to the `log.txt` file. 

* Do not overwrite your file each time you run a command.

- - -

### Minimum Requirements

Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

- - -

### Create a README.md

Add a `README.md` to your repository describing the project. Here are some resources for creating your `README.md`. Here are some resources to help you along the way:

* [About READMEs](https://help.github.com/articles/about-readmes/)

* [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

- - -

### Add To Your Portfolio

After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.

- - -

### One More Thing

If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.

**Good Luck!**

file:///C:/Users/jenni/Downloads/lang.md.html
*/