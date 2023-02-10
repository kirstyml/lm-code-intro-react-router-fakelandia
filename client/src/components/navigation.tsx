import { NavLink } from "react-router-dom"

const Nav : React.FC = () => {
    return (
        <nav className="nav-bar">
            <ul className="nav-bar__links">
                <li className="nav-bar__link"><NavLink to='/'>Home</NavLink></li>
                <li className="nav-bar__link"><NavLink to='/misdemeanours'>Misdemeanours</NavLink></li>
                <li className="nav-bar__link"><NavLink to='/confession'>Confess to Us</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav