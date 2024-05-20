import { client } from "../client"

export async function fetchMoviesFromSanity(movieids) {
    const movies = await client.fetch(`*[_type == "movies" && _id in $movieids]{
        _id, 
        movietitle,
        imdb_id
    }`, { movieids })
    return movies
}

export async function fetchMoviesByGenre(genreId) {
    const movies = await client.fetch(`*[_type == "movies" && references($genreId)]{
        _id, 
        movietitle,
        imdb_id
    }`, { genreId })
    return movies
}