import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ data }) {
    const [menu, setMenu] = useState(data);

    const addUrlToMenu = (inputData) => {
        return (
            inputData &&
            inputData.map((item, index) => {
                let resMenu = item.dropdown ? (
                    <li className="dropdown li-nav">
                        <a className="a-link" href={item.link.url}>{item.link.label}</a>
                        <ul className="dropdown-menu ul-nav">{addUrlToMenu(item.dropdown)}</ul>
                    </li>
                ) : (
                    <li className="li-nav">
                        <Link to={item.link.url}>{item.link.label}</Link>
                    </li>
                );

                return resMenu;
            })
        );
    };

    console.log(menu);

    return (
        <nav>
            <ul className="ul-nav">
                {menu &&
                    menu.map((item, index) => {
                        let resMenu = item.dropdown ? (
                            <li className="dropdown li-nav">
                                <a className="a-link" href={item.link.url}>{item.link.label}</a>
                                <ul className="dropdown-menu ul-nav">{addUrlToMenu(item.dropdown)}</ul>
                            </li>
                        ) : (
                            <li className="li-nav">
                                <Link to={item.link.url}>{item.link.label}</Link>
                            </li>
                        );

                        return resMenu;
                    })}
            </ul>
        </nav>
    );
}

export default Navbar;
