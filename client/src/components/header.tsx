import Nav from "./navigation";
import { ReactComponent as Logo } from "../assets/Fakelandia.svg";

export const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Logo height={60} width={60} />
                    <h1 className="header__logo-title">Fakelandia Justice Department</h1>
                </div>
                <Nav />
            </div>
        </header>
    )
}