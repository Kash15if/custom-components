import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

    const [menu, setMenu] = useState();

    const addUrlToMenu = (inputData) => {

        let htmlComp;

        inputData.links.length && inputData.links.map((item) => {
            htmlComp += <li> <Link to={item.link}>Home</Link></li>
        })

        if (inputData.dropdown) {
            htmlComp += <ul>{addUrlToMenu(inputData.dropdown)}</ul>
        }
    }


    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li className="dropdown">
                    <a href="#">Products</a>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to="/products/category1">Category 1</Link>
                        </li>
                        <li>
                            <Link to="/products/category2">Category 2</Link>
                        </li>
                        <li>
                            <Link to="/products/category3">Category 3</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
