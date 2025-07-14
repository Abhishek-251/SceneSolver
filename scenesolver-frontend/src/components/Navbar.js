import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // --- UPDATED: State to hold the entire user object ---
  // Initialize state to null. We'll populate it from localStorage.
  const [user, setUser] = useState(null);

  // --- UPDATED: Effect to load user data on component mount ---
  // This runs only once when the Navbar is first rendered.
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // If a user object is found in storage, parse it and set it to state
      setUser(JSON.parse(storedUser));
    }
  }, [isLoggedIn]); // Re-check if the isLoggedIn prop changes

  const handleLogout = () => {
    // onLogout should handle clearing localStorage and updating parent state
    onLogout(); 
    navigate('/');
  };
  
  const closeAllMenus = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }
  
  // Click outside to close profile dropdown (no changes needed here)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);


  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <NavLink to={isLoggedIn ? '/home' : '/'} className={styles.navLogo} onClick={closeAllMenus}>
          SceneSolver
        </NavLink>

        {isLoggedIn && (
          <>
            <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Main Navigation for Desktop */}
            <nav className={menuOpen ? `${styles.navMenu} ${styles.active}` : styles.navMenu}>
              <li className={styles.navItem}>
                <NavLink to="/home" className={styles.navLink} onClick={closeAllMenus}>Home</NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink to="/how-it-works" className={styles.navLink} onClick={closeAllMenus}>How It Works</NavLink>
              </li>
               <li className={styles.navItem}>
                <NavLink to="/history" className={styles.navLink} onClick={closeAllMenus}>History</NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink to="/upload" className={styles.navLink} onClick={closeAllMenus}>Analyze</NavLink>
              </li>
              <li className={`${styles.navItem} ${styles.logoutButtonMobile}`}>
                 <button onClick={handleLogout}>Logout</button>
              </li>
            </nav>

            {/* Profile Dropdown for Desktop */}
            <div className={styles.profileContainer} ref={dropdownRef}>
                {/* --- UPDATED: Profile button now includes user's name --- */}
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className={styles.profileButton}>
                    <FaUserCircle className={styles.profileIcon} />
                    {/* Conditionally render the name only if the user object exists */}
                    {user && <span className={styles.userName}>{user.name}</span>}
                </button>

                {dropdownOpen && (
                    <div className={styles.profileDropdown}>
                        {/* --- UPDATED: Welcome message with name in dropdown --- */}
                        <div className={styles.dropdownHeader}>
                            Signed in as <br/><strong>{user ? user.name : 'User'}</strong>
                        </div>
                        <NavLink to="/history" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                            Analysis History
                        </NavLink>
                        <div className={`${styles.dropdownItem} ${styles.logoutItem}`} onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;