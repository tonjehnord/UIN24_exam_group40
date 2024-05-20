import { client } from "../client"

export async function fetchMoviesFromSanity(movieIds) {
    if (!Array.isArray(movieIds) || movieIds.length === 0) {
        return []
    }

    const movies = await client.fetch(
        `*[_type == "movies" && _id in $movieIds]{
            _id, 
            movietitle,
            imdb_id
        }`,
        { movieIds }
    )
    return movies
}