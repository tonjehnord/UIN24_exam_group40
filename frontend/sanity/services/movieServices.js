import { client } from "../client"

export async function fetchMoviesFromSanity(movieids) {
    const movies = await client.fetch(`*[_type == "movies" && _id in $movieids]{
        _id, 
        movietitle,
        imdb_id
    }`, { movieids })
    return movies
}

export async function fetchMoviesByGenre(genreid) {
    const movies = await client.fetch(`*[_type == "movies" && references($genreid)]{
        _id, 
        movietitle,
        imdb_id
    }`, { genreid })
    return movies
}