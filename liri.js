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

//twitter  working!

if (command === "my-tweets") {
  var params = {
    screen_name: 'JenniferL1921',
    count: 20,
    result_type: 'recent',
  };

  client.get('statuses/user_timeline', params, function (err, data, response) {

    if (!err) {

      for (let i = 0; i < data.length; i++) {

        let id = { id: data[i].id_str }

        //console.log(JSON.stringify(data[i].text));
        console.log(JSON.stringify(data[i].created_at));
        console.log(data[i].text);
      }
    }
  });
}



//IMDB movies  works!

if (command === "movie-this") {
  // run the request module on a URL with a JSON

  request("http://www.omdbapi.com/?t=" + songmovie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

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
      console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/, It's on Netflix!")
    }
  });
}

//Do What It Says (grab text from random.txt and use it to run spotify-this-song command)  doesn't work yet

// This block of code will read from the random.txt file
fs.readFile("random.txt", "utf8", function (error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  //console.log("node liri.js " + data);

});


