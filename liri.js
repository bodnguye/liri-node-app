require("dotenv").config();

// **** Variables **** //
var axios = require('axios');

var moment = require('moment');
moment().format();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var fs = require('fs');

var shield = "\n========================================================================\n";

// Take two arguments.
var command = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

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
function concertThis(userInput) {

    var concertliri = `\nHere are some concerts with the result "${userInput}":\n\n`;
    var artist = userInput;

    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    // console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                // console.log(response.data);
                var datetime = response.data[i].datetime;

                var concertData = [`${i}. Venue: ${response.data[i].venue.name}
                City: ${response.data[i].venue.city}
                Date: ${moment(datetime)}`].join();

                console.log(concertData);
                console.log(shield);

                fs.appendFile("log.txt", concertliri + concertData + "\n" + shield, function (err) {
                    if (err) throw err;
                });
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
function spotifyThis(userInput) {

    var songliri = `\nHere are some songs with the result "${userInput}":\n\n`;
    var song = userInput;

    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            // console.log(songs);
            var songs = response.tracks.items;

            for (var i = 0; i < 5; i++) {

                var songData = [`${i}. Artists: ${songs[i].artists[0].name}
                Song: ${songs[i].name}
                Album: ${songs[i].album.name}
                Preview: ${songs[i].preview_url}`].join();

                console.log(songData);
                console.log(shield);

                fs.appendFile("log.txt", songliri + songData + "\n" + shield, function (err) {
                    if (err) throw err;
                });
            }

        })
        .catch(function (err) {
            console.log(err);
        });
}

/***************************************************/
/* ************     Movie Function     *********** */
/***************************************************/
function movieThis(userInput) {

    var movieName = userInput;
    var movieliri = `\nHere is the movie with the result "${userInput}":\n\n`;

    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response);
            movieData = [`Title: ${response.data.Title}
            Year: ${response.data.Year}
            IMDB Rating: ${response.data.imdbRating}
            Rotten Tomatoes Rating: ${response.data.Metascore}
            Country: ${response.data.Country}
            Language: ${response.data.Language}
            Plot: ${response.data.Plot}
            Actors: ${response.data.Actors}`].join();

            fs.appendFile("log.txt", movieliri + movieData + "\n" + shield, function (err) {
                if (err) throw err;

                console.log(shield);
                console.log(movieData);
                console.log(shield);
            });
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
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var randomArr = data.split(',');
        console.log(randomArr);

        switcher(randomArr[0], randomArr[1]);
    });
}

switcher(command, userInput);