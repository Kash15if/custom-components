import { useState } from "react";
import sliderStyles from "./VerticalSlider.module.css";
import imagesDataSet from "../../../data/imageData";
const imagesDir = require.context("../../../storage/images/", true);

const VerticalCarousel = () => {
    const [page, setPage] = useState(0);

    const changePage = (val) => {
        let tempPage =
            val === 1
                ? page >= imagesDataSet.length - 1
                    ? 0
                    : page + 1
                : page <= 0
                    ? imagesDataSet.length - 1
                    : page - 1;

        setPage(tempPage);
    };

    return (
        <div className={sliderStyles.container}>
            {imagesDataSet && imagesDataSet.length && (
                <img
                    className={sliderStyles.images}
                    src={imagesDir(`./${imagesDataSet[page].image}`)}
                    alt="Italian Trulli"
                />
            )}

            <div className={sliderStyles.pageDots}>
                <span onClick={() => changePage(-1)}>&#8681;</span>
                {imagesDataSet &&
                    imagesDataSet.length &&
                    imagesDataSet.map((img, index) => (
                        <span
                            className={`${sliderStyles.dot} ${page === index ? sliderStyles.active : ""
                                }`}
                        ></span>
                    ))}
                <span onClick={() => changePage(1)}>&#8679;</span>
            </div>
        </div>
    );
};

export default VerticalCarousel;
