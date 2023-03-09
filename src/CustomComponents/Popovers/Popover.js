import { useEffect } from "react";
import popoverStyles from "./Popover.module.css"

const Popover = ({ variant, time, children, setAlert }) => {
    useEffect(() => {

        const timer = setTimeout(() => {
            setAlert(false);
        }, time * 1000);
        return () => clearTimeout(timer);

    }, []);

    return <div className={`${popoverStyles.alert} ${popoverStyles['alert-' + variant]}`}>{children}</div>;
}

export default Popover;