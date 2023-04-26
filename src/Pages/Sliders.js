import HorizontalSlider from "../CustomComponents/Slider/HorizontalCarousel/HorizontalSlider";
import ConcaveSlider from "../CustomComponents/Slider/CurveCarousel/ConcaveSlider";
import ConvexSlider from "../CustomComponents/Slider/CurveCarousel/ConvexSlider";
import VerticalCarousel from "../CustomComponents/Slider/VerticalCarousel/VerticalSlider";

import imagesDataSet from "../data/imageData";

const imagesDir = require.context("../storage/images/", true);

const Sliders = () => {
    return (<div>

        <ConcaveSlider noOfComponentsInPage={3} data={imagesDataSet} />


        <ConvexSlider noOfComponentsInPage={3} data={imagesDataSet} />


        <HorizontalSlider imagesDataSet={imagesDataSet} imagesDir={imagesDir} />

        <VerticalCarousel />


    </div>);
}

export default Sliders;