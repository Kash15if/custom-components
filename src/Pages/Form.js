import MultiSelection from "../CustomComponents/Forms/Selection/MultiCheckboxSelection";
import CustomSelect from "../CustomComponents/Forms/Selection/CustomSelect";
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

        {/* <CustomSelect /> */}

    </div>);
}

export default Forms;