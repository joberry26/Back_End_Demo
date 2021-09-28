const movies = require('./db.json');
let id = 11;

module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies)
    },
    deleteMovie: (req, res) => {
        const { movieId } = req.params;

        const tgtIndex = movies.findIndex(function (movieObj) {
            return movieObj.id === +movieId; //parseInt(movieId) <- same thing as +
        })
    
        if (tgtIndex === -1) {
            res.status(404).send('Movie not found!')
        } else {
            movies.splice(tgtIndex, 1);
            res.status(200).send(movies);
        }
    },
    addMovie: (req, res) => {
        const { title, rating, imageURL }= req.body;

        // const newMovie = {
        //     id: id,
        //     title: title,
        //     rating: rating,
        //     imageURL: imageURL
        // }
// works when property is the exact same as property identifier

        const newMovie = {
            id,
            title,
            rating,
            imageURL
        }

        movies.push(newMovie);
        id++;

        res.status(200).send(movies)
    },
    updateMovie: (req, res) => {
        const { id } = req.params;
        const { type } = req.body;

        const tgtIndex = movies.findIndex(function (movieObj) {
            return movieObj.id === +id;
    })

    const tgtMoviObj = movies[tgtIndex]

    if (type === 'plus') {
        if (tgtMoviObj.rating < 5) {
            tgtMoviObj.rating += 1;
        }
        res.status(200).send(movies);
    } else if (type === 'minus') {
        if (tgtMoviObj.rating > 1) {
            tgtMoviObj.rating -= 1;
        }
        res.status(200).send(movies);
    } else {
        res.status(400).send('What did you do?! Something went wrong.')
    }
}};
