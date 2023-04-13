import { useState } from "react";
import imagesDataSet from "../../../data/imageData";
import sliderStyles from "./CurveSlider.module.css"
const imagesDir = require.context("../../../storage/images/", true);

const Convex = ({ noOfComponentsInPage, data }) => {

    const [pageNo, setPageNo] = useState(1);
    const [componentStartIndex, setComponentStartIndex] = useState(0);
    const [componentEndIndex, setComponentEndIndex] = useState(Math.min((data.length / noOfComponentsInPage) - 1, noOfComponentsInPage))


    const changePage = (next) => {

        let tempPageNo = next ? Math.min(Math.ceil((data.length / noOfComponentsInPage), pageNo + 1)) : Math.max(1, pageNo - 1)
        let tempStartIndex = (tempPageNo - 1) * noOfComponentsInPage);
        let tempEndIndex = Math.min((tempPageNo * noOfComponentsInPage), data.length) - 1;

        console.log(tempEndIndex, tempStartIndex, tempPageNo)
    }
    return (<div style={{
        display: "flex",
    }}>

        <img style={{ clipPath: "polygon(0 0, 100% 10%, 100% 100%, 0% 100%)", margin: "10px", width: "60%" }} src={imagesDir(`./${imagesDataSet[0].image}`)} />
        <img style={{ clipPath: "polygon(0 10%, 100% 10%, 100% 100%, 0% 100%)", margin: "10px", margin: "10px", width: "80%" }} src={imagesDir(`./${imagesDataSet[1].image}`)} />
        <img style={{ clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0% 100%)", margin: "10px", width: "60%" }} src={imagesDir(`./${imagesDataSet[2].image}`)} />

    </div>);
}

export default Convex;