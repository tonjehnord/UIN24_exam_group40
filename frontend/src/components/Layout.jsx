import Header from "./Header";

export default function Layout({children}) {
    return (
        <>
        <Header />
        <main>
        {children}
        </main>
        <footer>© UIN 2024 Group 40</footer>
        </>
    )
}