import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { ReactComponent as Menu } from "../assets/menu.svg";

const Nav: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav className="nav-bar">
      <button className="nav-menu" onClick={() => setIsExpanded(!isExpanded)}>
        <Menu height={40} width={40} />
      </button>
      <ul
        className={isExpanded ? "nav-bar__links--expanded" : "nav-bar__links"}
      >
        <li className="nav-bar__link">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-bar__link-text--active" : "nav-bar__link-text"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav-bar__link">
          <NavLink
            to="/misdemeanours"
            className={({ isActive }) =>
              isActive ? "nav-bar__link-text--active" : "nav-bar__link-text"
            }
          >
            Misdemeanours
          </NavLink>
        </li>
        <li className="nav-bar__link">
          <NavLink
            to="/confession"
            className={({ isActive }) =>
              isActive ? "nav-bar__link-text--active" : "nav-bar__link-text"
            }
          >
            Confess to Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
