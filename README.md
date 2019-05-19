# liri-node-app

**Contributor**: `Bobby Nguyen`

**Created on**: `May 18 2019`

## Introduction
LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives back data. Liri has integrated Bands In Town, Spotify, and OMDb APIs via  NPM modules. The `commands` that Liri can use are:
   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`


## Technologies Used
- Node.js
- JavaScript
- API's:
    - Bands in Town API 
    - OMDb API
- Node Packages:
    -  Node-Spotify-API
    - Axios
    - Moment
    - DotEnv
    - fs

## Instruction Guide
1. Open terminal.
2. Navigate to the `liri-node-app` folder that contains the `liri.js` file. 
3. Run the following Commands.
4. Get results

    **Use-Case 1**: Run the `concert-this` command
    
        node liri.js concert-this <name of artist or band>
    
    Output: Liri will display a list of all venues, dates,and cities where the artist or band will perform.  
    See screen-shot:

    ![Results](/screenshots/concert-this.png)
    
    Liri will log all the results in the log.txt file.
    
    ![Results](/screenshots/concert-log.png)

    **Use-Case 2**: Run the `spotify-this-song` command
    
        node liri.js spotify-this-song <name of song>
    
    Output: Liri will display artist,album, preview URL, and name of the song. 
    
    See screen-shot:

    ![Results](/screenshots/spotify-this-song.png)
    
    Liri will log all the results in the log.txt file.
    
    ![Results](/screenshots/spotify-log.png)

    **Use-Case 3**: Run the `movie-this` command
    
        node liri.js movie-this <name of movie>
    
    Output: Liri will display the year, IMDB rating, Rotten Tomatoes rating, country, language, plot, and actors of the  movie. 
    
    See screen-shot:

    ![Results](/screenshots/movie-this.png)
    
    Liri will log all the results in the log.txt file.
    
    ![Results](/screenshots/movie-log.png)

    **Use-Case 4**: Run the `do-what-it-says` command
        
        node liri.js do-what-it-says
        
    Output: Liri will read the text in the random.txt file, and perform the command listed in the random.txt file. 
    
    See screen-shot:

    ![Results](/screenshots/do-what-it-says.png)
    
    Liri will log all the results in the log.txt file.
    
    ![Results](/screenshots/do-log.png)
