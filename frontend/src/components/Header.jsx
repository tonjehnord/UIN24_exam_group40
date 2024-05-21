import { PiUserCircle } from 'react-icons/pi'
import { BiCameraMovie } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export default function Header({user}) {
    return (
        <header>
            <nav>
                <ul>
                    <li className="logo"><Link to="/">What To See?</Link></li>
                    <li className="homeButton"><Link to="/"><BiCameraMovie /> Hva skal jeg se?</Link></li>
                    <li><Link to="/genres">Bla gjennom sjangere</Link></li>
                    <li><PiUserCircle /> {user}</li>
                </ul>
            </nav>
        </header>
    )
}