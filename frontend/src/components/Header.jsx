import { PiUserCircle } from "react-icons/pi"
import { BiCameraMovie } from "react-icons/bi"
import { Link } from "react-router-dom"

export default function Header({user}) {
    return (
        <header>
            <nav>
                <ul>
                    <li className="logo">What To See?</li>
                    <Link to="/"><BiCameraMovie /> Hva skal jeg se?</Link>
                    <li>Bla gjennom sjangere</li>
                    <li><PiUserCircle /> {user}</li>
                </ul>
            </nav>
        </header>
    )
}