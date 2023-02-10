import Nav from "./navigation"

export const Header: React.FC = () => {
    return (
        <header className="header">
            <h2 className="header__site-title">Fakelandia Justice Department</h2>
            <Nav />
        </header>
    )
}