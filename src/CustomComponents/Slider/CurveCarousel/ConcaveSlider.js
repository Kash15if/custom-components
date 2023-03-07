import { useState } from "react";
import sliderStyles from "./CurveSlider.module.css"
import imagesDataSet from "../../../data/imageData";
const imagesDir = require.context("../../../storage/images/", true);


const Concave = () => {



    const [page, setPage] = useState(0);





    const changePage = (val) => {
        let tempPage = val === 1 ? (page >= imagesDataSet.length - 1 ? 0 : page + 1) : (page <= 0 ? imagesDataSet.length - 1 : page - 1)
        setPage(tempPage)
    }




    return (<div className={sliderStyles.bottle} >
        {imagesDataSet && imagesDataSet.length && <img className={sliderStyles.convexMirror} src={imagesDir(`./${imagesDataSet[page].image}`)} alt="Italian Trulli" />
        }

        <button onClick={() => changePage(-1)}>&#x2190;</button>

        {imagesDataSet && imagesDataSet.length &&
            imagesDataSet.map((img, index) =>
                <span className={`${sliderStyles.dot} ${page === index ? sliderStyles.active : ""}`}></span>)
        }
        <button onClick={() => changePage(1)}>&#x2192;</button>
    </div >);
}

export default Concave;