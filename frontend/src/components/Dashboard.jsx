import { useParams } from 'react-router-dom'

export default function Dashboard({user}) {

    const { username } = useParams()

    return (
        <>
            <h2>Forslag for {user} og {username}</h2>
            <section>
                <h3>Catch Up!</h3>
                <p>Dere har ANTALL filmer felles i ønskelistene deres.</p>
            </section>
            <section>
                <h3>Go Safe!</h3>
                <p>Dere har ANTALL filmer felles i favorittlisten deres.</p>
            </section>
            <section>
                <h3>Utforsk!</h3>
                <p>Dere liker begge disse sjangerne, sjekk hvilke filmer som finnes å velge mellom:</p>
            </section>
        </>
    )
}