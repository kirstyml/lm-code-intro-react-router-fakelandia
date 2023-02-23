import { NavLink } from "react-router-dom"

const Nav: React.FC = () => {
    return (
        <nav className="nav-bar">
            <ul className="nav-bar__links">
                <li className="nav-bar__link">
                    <NavLink to='/' className={({ isActive }) =>
                        isActive ? "nav-bar__link-text--active" : "nav-bar__link-text"
                    }>Home</NavLink></li>
                <li className="nav-bar__link"><NavLink to='/misdemeanours' className={({ isActive }) =>
                    isActive ? "nav-bar__link-text--active" : "nav-bar__link-text"
                }>Misdemeanours</NavLink></li>
                <li className="nav-bar__link"><NavLink to='/confession' className={({ isActive }) =>
                    isActive ? "nav-bar__link-text--active" : "nav-bar__link-text"
                }>Confess to Us</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav