import React from "react";
import { NavLink } from "react-router-dom";
import { RiCopperCoinFill } from "react-icons/ri";
import "../styles/Navbar.css";


const Navbar = () => {
  return (
    <div className="nav-container">
      <nav>
        <ul>
          <li className="home-button">
            <NavLink to="/">
              <RiCopperCoinFill className="icon" />
              Crypto<span>Coin</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Exchanges">Exchanges</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
