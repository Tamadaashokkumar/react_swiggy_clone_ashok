import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <section className="NavBarSection">
            <div className="companyTitle">
                <Link to="/" className="link">
                    <h2 className="navbarLogo">Ashok</h2>
                </Link>
            </div>
            <div className="searchBar">
                <input type="search" placeholder="Search..." />
            </div>
            <div className="userAuth">
                Login / Signup
            </div>
        </section>
    )
}

export default NavBar