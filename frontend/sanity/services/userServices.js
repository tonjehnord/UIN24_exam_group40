import { client } from "../client"

export async function fetchUsersFromSanity() {
    const users = await client.fetch(`*[_type == "users"]{
        _id, 
        username,
        wishlist}`)
    return users
  }