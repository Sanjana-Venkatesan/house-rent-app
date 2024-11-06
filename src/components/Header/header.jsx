// Assuming you have a Header component where you want to add the SignIn link
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Your header styles

function Header() {
    return (
        <header className="header">
            <h1 className="logo">RentEase</h1> {/* Optional: Add a class for styling the logo */}
            <nav className="nav-links"> {/* Added class for styling */}
                <Link to=" ">Home</Link>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Register</Link>
            </nav>
        </header>
    );
}

export default Header;