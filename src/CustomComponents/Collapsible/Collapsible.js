const Collapsible = ({ children, open, setOpen }) => {

    const collapse = () => {
        setOpen(false);
    }
    return (
        open &&
        <div>
            <button onClick={() => collapse()}>Close</button>
            {
                children
            }


        </div>
    );
}

export default Collapsible;