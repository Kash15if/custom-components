import { useState } from "react";
import sliderStyles from "./HorizontalSlider.module.css";

const Horizontal = ({ imagesDataSet, imagesDir }) => {
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
            <div className={sliderStyles.Sliderbody}>
                {imagesDataSet && imagesDataSet.length && (
                    <img
                        className={sliderStyles.ImageData}
                        src={imagesDir(`./${imagesDataSet[page].image}`)}
                        alt="Italian Trulli"
                    />
                )}

                <div className={sliderStyles.PreNextBtn}>
                    <button
                        className={sliderStyles.Prebtn}
                        onClick={() => changePage(-1)}
                    >
                        &#10094;
                    </button>

                    <button
                        className={sliderStyles.Nextbtn}
                        onClick={() => changePage(1)}
                    >
                        &#10095;
                    </button>
                </div>
                <div className={sliderStyles.ActiveBtn}>
                    {imagesDataSet &&
                        imagesDataSet.length &&
                        imagesDataSet.map((img, index) => (
                            <span
                                className={`${sliderStyles.dot} ${page === index ? sliderStyles.active : ""
                                    }`}
                            ></span>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Horizontal;
