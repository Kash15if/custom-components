import imagesDataSet from "../../../data/imageData";
import sliderStyles from "./CurveSlider.module.css"
const imagesDir = require.context("../../../storage/images/", true);

const Convex = () => {
    return (<div style={{
        display: "flex",
    }}>

        <img style={{ clipPath: "polygon(0 0, 100% 10%, 100% 100%, 0% 100%)", margin: "10px", width: "60%" }} src={imagesDir(`./${imagesDataSet[0].image}`)} />
        <img style={{ clipPath: "polygon(0 10%, 100% 10%, 100% 100%, 0% 100%)", margin: "10px", margin: "10px", width: "80%" }} src={imagesDir(`./${imagesDataSet[1].image}`)} />
        <img style={{ clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0% 100%)", margin: "10px", width: "60%" }} src={imagesDir(`./${imagesDataSet[2].image}`)} />

    </div>);
}

export default Convex;