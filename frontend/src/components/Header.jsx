import { PiUserCircle } from "react-icons/pi";
import { BiCameraMovie } from "react-icons/bi";

export default function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li className="logo">What To See?</li>
                    <li><BiCameraMovie /> Hva skal jeg se?</li>
                    <li>Bla gjennom sjangere</li>
                    <li><PiUserCircle /> Bruker</li>
                </ul>
            </nav>
        </header>
    )
}