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
1. Open your terminal such as Bash.
2. Navigate to the folder that contains the `liri.js` file. 
3. Depending on the command you run, the output will vary. 

    **Example 1**: Run the `concert-this` command
    
        node liri.js concert-this <name of artist or band>
    
    Output: The system will display a list of all events and locations where the artist or band will perform. It can result in multiple records. The system will also log all the results in the log.txt file. See screen-shot below:

    ![Results](/screenshots/concert_this_results.PNG)

    **Example 2**: Run the `spotify-this-song` command
    
        node liri.js spotify-this-song <name of song>
    
    Output: The system will display a list of information associated with the song. It can result in multiple records. The system will also log all the results in the log.txt file. See screen-shot below:

    ![Results](/screenshots/spotify_this_results.PNG)

    **Example 3**: Run the `movie-this` command
    
        node liri.js movie-this <name of movie>
    
    Output: The system will display information associated with the movie. The system will also log all the results in the log.txt file. See screen-shot below:

    ![Results](/screenshots/movie-this)


    **Example 4**: Run the `do-what-it-says` command
        
        node liri.js do-what-it-says
        
    Output: The system will read the text in the random.txt file, and perform the command listed in the random.txt file. 
    
    See screen-shot below:

    ![Results](/screenshots/dothis_this_results.PNG)
