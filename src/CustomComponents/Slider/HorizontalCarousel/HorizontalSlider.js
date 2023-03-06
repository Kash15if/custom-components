import { useState } from "react";
import imagesDataSet from "../../../data/imageData";
const imagesDir = require.context("../../../storage/images/", true);



const Horizontal = () => {

    const [page, setPage] = useState(0);

    const changePage = (val) => {

        let tempPage = val === 1 ? (page >= imagesDataSet.length - 1 ? page : page + 1) : (page <= 0 ? page : page - 1)

        setPage(tempPage)
    }

    return (<div>
        {imagesDataSet && imagesDataSet.length && <img src={imagesDir(`./${imagesDataSet[page].image}`)} alt="Italian Trulli" />
        }

        <button onClick={() => changePage(1)}>next</button>
        <button onClick={() => changePage(-1)}>prev</button>
    </div>);
}

export default Horizontal;