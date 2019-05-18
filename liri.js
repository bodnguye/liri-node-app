require("dotenv").config();

// **** Variables **** //
var axios = require('axios');

var moment = require('moment');
moment().format();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var fs = require('fs');

var inquirer = require('inquirer');

// Take two arguments.
var command = process.argv[2];
var nodeArgs = process.argv;
var userInput = "";
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
        userInput = userInput + "+" + nodeArgs[i];
    } else {
        userInput += nodeArgs[i];
    }
}

// The switch-case will direct which function gets run.
function switcher(command, userInput) {
switch (command) {
    case "concert-this":
        concertThis(userInput);
        break;

    case "spotify-this-song":
        spotifyThis(userInput);
        break;

    case "movie-this":
        movieThis(userInput);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}
}

/*****************************************************/
/* ************     Concert Function     *********** */
/*****************************************************/
function concertThis() {
    var artist = userInput;

    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    // console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var datetime = response.data[i].datetime;
                // console.log(response.data);
                console.log("========================================================================");
                console.log(`\nVenue: ${response.data[i].venue.name}
                City: ${response.data[i].venue.city}
                Date: ${moment(datetime)}\n`);
            }
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

/*****************************************************/
/* ************     Spotify Function     *********** */
/*****************************************************/
function spotifyThis() {
    var song = userInput;

    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            var songs = response.tracks.items;
            // console.log(songs);
            for (var i = 0; i < songs.length; i++) {
                console.log("========================================================================");
                console.log(`\nArtists: ${songs[i].artists[0].name}
                Song: ${songs[i].name}
                Album: ${songs[i].album.name}
                Preview: ${songs[i].preview_url}\n`);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

/***************************************************/
/* ************     Movie Function     *********** */
/***************************************************/
function movieThis() {
    var movieName = userInput;
  
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response);
            console.log("========================================================================");
            console.log(`Title: ${response.data.Title}
        Year: ${response.data.Year}
        IMDB Rating: ${response.data.imdbRating}
        Rotten Tomatoes Rating: ${response.data.Metascore}
        Country: ${response.data.Country}
        Language: ${response.data.Language}
        Plot: ${response.data.Plot}
        Actors: ${response.data.Actors}`);
            console.log("========================================================================\n");
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

/*********************************************************/
/* ************     doWhatItSay Function     *********** */
/*********************************************************/
function doWhatItSays() {
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        var randomArr = data.split(',');
        console.log(randomArr);

        switcher(randomArr[0], randomArr[1]);
    });
}

switcher(command, userInput);