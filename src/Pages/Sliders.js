import HorizontalSlider from "../CustomComponents/Slider/HorizontalCarousel/HorizontalSlider";
import ConcaveSlider from "../CustomComponents/Slider/CurveCarousel/ConcaveSlider";
import ConvexSlider from "../CustomComponents/Slider/CurveCarousel/ConvexSlider";

import imagesDataSet from "../data/imageData";

const Sliders = () => {
    return (<div>

        {/* <ConcaveSlider noOfComponentsInPage={3} data={imagesDataSet} /> */}


        <ConvexSlider noOfComponentsInPage={3} data={imagesDataSet} />


        <HorizontalSlider />


    </div>);
}

export default Sliders;