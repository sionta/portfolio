import React from 'react';

function NavBar(props) {
    const handleOnClick = () => {
        props.hideHeader()
    }

    return (
        <nav>
            <button className="nav_button" onClick={handleOnClick}><p>Home</p></button>
            <p>Portfolio</p>
            <p>Blog</p>
            <p>About</p>
            <p>Contact</p>
        </nav>
    )
}

export default NavBar;