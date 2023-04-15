import { useEffect, useState } from "react";
import sliderStyles from "./CurveSlider.module.css"
const imagesDir = require.context("../../../storage/images/", true);

const Convex = ({ noOfComponentsInPage, data }) => {

    // const [pageNo, setPageNo] = useState(1);
    // const [noOfCompInASlide , SetNoOfCompInASlide] = useState()
    // const [componentStartIndex, setComponentStartIndex] = useState(0);
    // const [componentEndIndex, setComponentEndIndex] = useState(Math.min(data.length, noOfComponentsInPage) - 1)
    const [imageIndexesInSlide, setImageIndexesInSlide] = useState();


    useEffect(() => {
        let tempNoOfComponent = noOfComponentsInPage;
        let tempArray = [];
        for (let ind = 0; ind < data.length; ind++) {
            if (tempNoOfComponent <= 0)
                break;
            tempArray.push(ind);
            tempNoOfComponent--;
        }
        for (let ind = 0; ind < tempNoOfComponent; ind++) {
            tempArray.push(ind);
        }
        setImageIndexesInSlide([...tempArray])
    }, [])


    const changePage = (next) => {
        let tempArray = imageIndexesInSlide;
        let lengthOfData = data.length;
        if (tempArray.length > 0) {
            if (next) {
                let newElementIndexToBeAdded = tempArray[tempArray.length - 1] + 1;
                tempArray.push((newElementIndexToBeAdded >= lengthOfData) ? 0 : newElementIndexToBeAdded)
                tempArray.shift();
            }
            else {
                let newElementIndexToBeAdded = tempArray[0] - 1;
                tempArray.unshift((newElementIndexToBeAdded <= 0) ? lengthOfData - 1 : newElementIndexToBeAdded)
                tempArray.pop();
            }
        }
        setImageIndexesInSlide([...tempArray])
    }


    return (

        <div>

            <div style={{
                display: "flex",
            }}>

                {imageIndexesInSlide && imageIndexesInSlide.map(item =>
                    <img style={{ clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0% 100%)", margin: "10px", width: "60%" }} src={imagesDir(`./${data[item].image}`)} />
                )}
                {/* <img style={{ clipPath: "polygon(0 0, 100% 10%, 100% 100%, 0% 100%)", margin: "10px", width: "60%" }} src={imagesDir(`./${imagesDataSet[0].image}`)} />
            <img style={{ clipPath: "polygon(0 10%, 100% 10%, 100% 100%, 0% 100%)", margin: "10px", margin: "10px", width: "80%" }} src={imagesDir(`./${imagesDataSet[1].image}`)} />
            <img style={{ clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0% 100%)", margin: "10px", width: "60%" }} src={imagesDir(`./${imagesDataSet[2].image}`)} /> */}

            </div>

            <button onClick={() => changePage(false)}>Prev</button>
            <button onClick={() => changePage(true)}>Next</button>
        </div>);
}

export default Convex;