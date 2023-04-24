import { useEffect, useState } from "react";
import ConcaveSliderStyle from "./ConvexSliderStyle.module.css";
const imagesDir = require.context("../../../storage/images/", true);

const Convex = ({ noOfComponentsInPage, data }) => {
    const [imageIndexesInSlide, setImageIndexesInSlide] = useState();
    const [dynamicClipPath, setDynamicClipPath] = useState();

    useEffect(() => {
        let tempNoOfComponent = noOfComponentsInPage;
        let tempArray = [];
        for (let ind = 0; ind < data.length; ind++) {
            if (tempNoOfComponent <= 0) break;
            tempArray.push(ind);
            tempNoOfComponent--;
        }
        for (let ind = 0; ind < tempNoOfComponent; ind++) {
            tempArray.push(ind);
        }
        setImageIndexesInSlide([...tempArray]);

        // ---------------------------------------------------for clip path to make it curve------------------

        let tempClipPathArray = new Array(noOfComponentsInPage);
        let valToBeAdded = 50 / noOfComponentsInPage;
        let mid = Math.ceil(noOfComponentsInPage / 2);
        let percentIndexCurve = 0;
        let midIndex = mid - 1;

        tempClipPathArray[
            midIndex
        ] = `polygon( 0% ${0}% , 100% ${0}%  , 100% 100%, 0% 100% )`;

        for (let i = midIndex - 1; i >= 0; i--) {
            tempClipPathArray[i] = `polygon( 0% ${percentIndexCurve + valToBeAdded
                }% , 100% ${percentIndexCurve}%  , 100% 100%, 0% 100% )`;
            percentIndexCurve += valToBeAdded;
        }

        percentIndexCurve = 0;
        for (let i = midIndex + 1; i < noOfComponentsInPage; i++) {
            tempClipPathArray[i] = `polygon( 0% ${percentIndexCurve}% , 100% ${percentIndexCurve + valToBeAdded
                }%  , 100% 100%, 0% 100% )`;
            percentIndexCurve += valToBeAdded;
        }

        setDynamicClipPath([...tempClipPathArray]);
    }, []);

    const changePage = (next) => {
        let tempArray = imageIndexesInSlide;
        let lengthOfData = data.length;
        if (tempArray.length > 0) {
            if (next) {
                let newElementIndexToBeAdded = tempArray[tempArray.length - 1] + 1;
                tempArray.push(
                    newElementIndexToBeAdded >= lengthOfData
                        ? 0
                        : newElementIndexToBeAdded
                );
                tempArray.shift();
            } else {
                let newElementIndexToBeAdded = tempArray[0] - 1;
                tempArray.unshift(
                    newElementIndexToBeAdded <= 0
                        ? lengthOfData - 1
                        : newElementIndexToBeAdded
                );
                tempArray.pop();
            }
        }
        setImageIndexesInSlide([...tempArray]);
    };

    return (
        <div className={ConcaveSliderStyle.MainBody}>
            {data && (
                <div className={ConcaveSliderStyle.container}>
                    {imageIndexesInSlide &&
                        imageIndexesInSlide.map((item, index) => (
                            <img
                                style={{
                                    clipPath: dynamicClipPath[index],
                                    margin: "0.5rem",
                                    width: "30%",
                                }}
                                src={imagesDir(`./${data[item].image}`)}
                            />
                        ))}
                </div>
            )}
            <div className={ConcaveSliderStyle.PreNextBtn}>
                <button
                    className={ConcaveSliderStyle.Prebtn}
                    onClick={() => changePage(-1)}
                >
                    &#10094;
                </button>

                <button
                    className={ConcaveSliderStyle.Nextbtn}
                    onClick={() => changePage(1)}
                >
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default Convex;
