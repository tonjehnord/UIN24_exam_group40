import { client } from "../client"

export async function fetchUsersFromSanity() {
    const users = await client.fetch(`*[_type == "users"]{
        _id, 
        username,
        wishlist,
        favoritemovies,
        favoritegenres}`)
    return users
}

/*export async function fetchUserFromSanity(userid) {
    const user = await client.fetch(`*[_type == "users" && _id == $userid]{
        _id, 
        favoritegenres
    }`, { userid })
    return user
}*/

/*export async function updateFavoriteGenres(userid, favoritegenres) {
    const result = await client
    .patch(userid)
    .set({favoritegenres: favoritegenres})
    .commit({autoGenerateArrayKeys: true})
    .then(() => {return "Success"})
    .catch((error) => {return "Error: " + error.message})
    return result
}*/