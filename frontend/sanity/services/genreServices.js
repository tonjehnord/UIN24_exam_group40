import { client } from "../client"

export async function fetchGenresFromSanity() {
    const genres = await client.fetch(`*[_type == "genres"]{
        _id, 
        genrename}`)
    return genres
}