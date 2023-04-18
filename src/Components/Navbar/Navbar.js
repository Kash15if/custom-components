import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ data }) {

    const [menu, setMenu] = useState(data);

    const addUrlToMenu = (inputData) => {


        return inputData && inputData.map((item, index) => {

            let resMenu = item.dropdown ? <li className="dropdown">
                <a href={item.link.url}>{item.link.label}</a>
                <ul className="dropdown-menu">
                    {addUrlToMenu(item.dropdown)}
                </ul>
            </li> : <li>
                <Link to={item.link.url}>{item.link.label}</Link>
            </li>

            return resMenu
        }

        )
    }

    console.log(menu)

    return (
        <nav>
            <ul>
                {
                    menu && menu.map((item, index) => {

                        let resMenu = item.dropdown ? <li className="dropdown">
                            <a href={item.link.url}>{item.link.label}</a>
                            <ul className="dropdown-menu">
                                {addUrlToMenu(item.dropdown)}
                            </ul>
                        </li> : <li>
                            <Link to={item.link.url}>{item.link.label}</Link>
                        </li>

                        return resMenu;
                    }

                    )
                }

            </ul>
        </nav>
    );
}

export default Navbar;
