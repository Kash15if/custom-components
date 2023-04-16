import { useEffect, useState } from "react";
import sliderStyles from "./CurveSlider.module.css"
const imagesDir = require.context("../../../storage/images/", true);

const Concave = ({ noOfComponentsInPage, data }) => {

    // const [pageNo, setPageNo] = useState(1);
    // const [noOfCompInASlide , SetNoOfCompInASlide] = useState()
    // const [componentStartIndex, setComponentStartIndex] = useState(0);
    // const [componentEndIndex, setComponentEndIndex] = useState(Math.min(data.length, noOfComponentsInPage) - 1)
    const [imageIndexesInSlide, setImageIndexesInSlide] = useState();
    const [dynamicClipPath, setDynamicClipPath] = useState()


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
        setImageIndexesInSlide([...tempArray]);

        // ---------------------------------------------------


        let tempClipPathArray = [];
        let percentIndexCurve = 0;
        let valToBeAdded = 50 / noOfComponentsInPage;
        for (let i = 0; i < noOfComponentsInPage; i++) {

            if (i < Math.floor(noOfComponentsInPage / 2)) {
                tempClipPathArray.push(`polygon( 0% ${percentIndexCurve}% , 100% ${percentIndexCurve + valToBeAdded}%  , 100% 100%, 0% 100% )`)
                percentIndexCurve += valToBeAdded;
            }
            else if (i === Math.floor(noOfComponentsInPage / 2)) {
                tempClipPathArray.push(`polygon( 0% ${percentIndexCurve}% , 100% ${percentIndexCurve}%  , 100% 100% , 0% 100% )`)
            }
            else {
                tempClipPathArray.push(`polygon( 0% ${percentIndexCurve}% , 100% ${percentIndexCurve - valToBeAdded}%  , 100% 100% , 0% 100% )`)
                percentIndexCurve -= valToBeAdded;
            }
        }
        console.log(tempClipPathArray)
        setDynamicClipPath(tempClipPathArray);



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

                {imageIndexesInSlide && imageIndexesInSlide.map((item, index) =>
                    <img style={{ clipPath: dynamicClipPath[index], margin: "10px", width: "60%" }} src={imagesDir(`./${data[item].image}`)} />
                )}

            </div>

            <button onClick={() => changePage(false)}>Prev</button>
            <button onClick={() => changePage(true)}>Next</button>
        </div>);
}

export default Concave;