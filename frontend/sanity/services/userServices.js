import { client, updateClient } from "../client"

export async function fetchUsersFromSanity() {
    const users = await client.fetch(`*[_type == "users"]{
        _id, 
        username,
        wishlist,
        favoritemovies,
        favoritegenres}`)
    return users
}

export async function updateFavoriteGenres(userid, favoritegenres) {
    const result = await updateClient
    .patch(userid)
    .set({favoritegenres: favoritegenres})
    .commit({autoGenerateArrayKeys: true})
    .then(() => {return "Success"})
    .catch((error) => {return "Error: " + error.message})
    return result
}