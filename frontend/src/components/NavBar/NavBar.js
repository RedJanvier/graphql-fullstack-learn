import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { GlobalContext } from '../../context/GlobalState';
import styles from './Search.module.css';
import logo from '../../assets/logo.png';

const NavBar = () => {
  const { token } = useContext(GlobalContext);

  return (
    <div className={styles.search}>
      <div className={styles.logo}>
        <img src={logo} alt="website-brand" width="100%" />
      </div>
      <div>
        <ul>
          <li>
            {!token ? (
              <NavLink to="/auth" className={styles.otherBtns}>
                Login
              </NavLink>
            ) : (
              <NavLink to="/bookings" className={styles.otherBtns}>
                Bookings
              </NavLink>
            )}
          </li>

          <li>
            <NavLink to="/events" className={styles.otherBtns}>
              Events
            </NavLink>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
