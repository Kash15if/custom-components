import { useState } from "react";
import PopupStyle from "./PopUpStyle.module.css";

const Popup = ({ children, visible, onClose }) => {
    const closePopup = () => {
        onClose();
    };

    return visible ? (
        <div className={PopupStyle.modal}>
            <div className={PopupStyle.modalcontent2}>
                <div className={PopupStyle.CloseBtnAlign}>
                    <button className={PopupStyle.CloseBtn} onClick={() => closePopup()}>
                        X
                    </button>
                </div>
                {children}
            </div>
        </div>
    ) : (
        ""
    );
};

export default Popup;
