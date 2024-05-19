import { MdFavorite } from "react-icons/md"
import { LiaUserFriendsSolid } from "react-icons/lia"
import MovieCard from "./MovieCard"

export default function Frontpage() {
    return (
        <>
        <section>
            <h2>Hei, *Bruker*!</h2>
            <h3><MdFavorite /> Filmer jeg skal se!</h3>
            <p>Disse filmene ligger i ønskelisten din:</p>
            <MovieCard />
        </section>
        <section>
            <h2><LiaUserFriendsSolid /> Jeg skal se sammen med</h2>
            <ul>
                <li>Bruker</li>
            </ul>
        </section>
        </>
    )
}