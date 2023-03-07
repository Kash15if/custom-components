import { useState } from "react";

const Popup = ({ children, visible, onClose }) => {


    const closePopup = () => {
        onClose();
    }

    return (visible ? <div>
        {children}
        <button onClick={() => closePopup()}>close</button>

    </div> : "");
}

export default Popup;