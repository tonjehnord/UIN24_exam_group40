import Header from './Header'

export default function Layout({children, user}) {
    return (
        <>
        <Header user={user}/>
        <main>
        {children}
        </main>
        <footer>© UIN 2024 Group 40</footer>
        </>
    )
}