import MultiSelection from "../CustomComponents/Forms/Selection/MultiCheckboxSelection";
import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";


const Forms = () => {

    const location = useLocation()

    useEffect(() => {
        if (location.hash) {
            let elem = document.getElementById(location.hash.slice(1))
            if (elem) {
                elem.scrollIntoView({ behavior: "smooth" })
            }
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        }
    }, [location,])



    return (<div>
        <MultiSelection />

        <div style={{ height: "100vh", backgroundColor: "black" }}></div>
        <div id="2nd" style={{ height: "100vh", backgroundColor: "green" }}></div>
    </div>);
}

export default Forms;