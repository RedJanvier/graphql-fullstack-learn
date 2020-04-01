import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { GlobalContext } from '../../context/GlobalState';
import './Search.css';
import logo from '../../assets/logo.png';

const NavBar = () => {
  const { token, logout } = useContext(GlobalContext);

  return (
    <div className="search">
      <div className="logo">
        <img src={logo} alt="website-brand" width="100%" />
      </div>
      <div className="navbar__links">
        <ul>
          <li>
            <NavLink to="/events" className="otherBtns">
              Events
            </NavLink>
          </li>
          {!token ? (
            <li>
              <NavLink to="/auth" className="otherBtns">
                Login
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/bookings" className="otherBtns">
                  Bookings
                </NavLink>
              </li>
              <li>
                <button className="otherBtns" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
