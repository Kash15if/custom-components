import profileStyles from "./InnerCard.module.css";
const imagesDir = require.context("../../../storage/images/", true);
const InnerCard = ({ innerData }) => {
    const title = innerData.current_address;
    const content = innerData.permanent_address;

    return (
        <div className={profileStyles.card}>
            <img
                className={profileStyles.ImageSize}
                src={imagesDir(`./imageA.jpg`)}
                alt="Avatar"
            />
            <div className={profileStyles.container}>
                <h4>
                    <b>{title}</b>
                </h4>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default InnerCard;