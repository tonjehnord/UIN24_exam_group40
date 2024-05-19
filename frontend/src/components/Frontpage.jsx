import { MdFavorite } from "react-icons/md"
import { LiaUserFriendsSolid } from "react-icons/lia"

export default function Frontpage() {
    return (
        <>
        <section>
            <h2>Hei, *Bruker*!</h2>
            <p><MdFavorite /> Filmer jeg skal se!</p>
            <article>
                <h3>Disse filmene ligger i ønskelisten din:</h3>
                <img />
                <p>LINK</p>
            </article>
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