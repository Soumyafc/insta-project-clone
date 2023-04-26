import React from 'react';
import './navbar.css';
import instalogo from '../img/logo.png';
import { Link } from 'react-router-dom';


function Navbar() {
    return ( <div className='nav-container'>
        <img src={instalogo} alt="INSTAGRAM" />
        <ul className='nav-menu'>
            
           <Link to="/signin"><li>Sign in</li></Link> 
           <Link to="/signup"><li>Sign Up</li></Link> 
           <Link to="/profile"><li>Profile</li></Link> 
           <Link to="/createPost"><li>Create Post</li></Link>
            

        </ul>
    </div> );
}

export default Navbar;
