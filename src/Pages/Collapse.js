import { useState } from "react";
import Collapsible from "../CustomComponents/Collapsible/Collapsible";


const Collapse = () => {

    const [col1Open, setCol1Open] = useState(false);
    return (
        <div>

            <button onClick={() => setCol1Open(true)}>Open</button>
            <Collapsible open={col1Open} setOpen={setCol1Open}>
                <h3>Title</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book.
                </p>
            </Collapsible>
        </div>
    );
}

export default Collapse;