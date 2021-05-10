// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre

  // create a new array to be returned by the API
  let moviesToReturn = {
    count: 0,
    information: []
  }

    // loop through the posts; for each one:
    for (let i=0; i < moviesFromCsv.length; i++) {

      // store each listing in memory
      let movie = moviesFromCsv[i]

      // check if the year is not zero. if so:
      if (movie.startYear == year) {
        // create a new post object containing the pertinent fields
        let theMovie = {
          title: movie.primaryTitle,
          releaseYear: movie.startYear,
          movieGenre: movie.genres
        }

      // add (push) the post object to the final Array
      moviesToReturn.information.push(theMovie)
      moviesToReturn.count = moviesToReturn.count + 1
      }

      // if (year == undefined || genre == undefined) {
      //   return {
      //     statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      //     body: `Nope!` // a string of data
      //   }
      // }
    //   else {
    //     let  = noMovies = {
    //       numResults: 0,
    //       movies: []
    //     }
    //   // add (push) the post object to the final Array
    //   moviesToReturn.push(noMovies)
    // }

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(moviesToReturn)// a string of data
    }
  }
}