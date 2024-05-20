import { client } from "../client"

export async function fetchMoviesFromSanity() {
    const movies = await client.fetch(`*[_type == "movies"]{
        _id, 
        movietitle,
        imdb_id}`)
    return movies
  }