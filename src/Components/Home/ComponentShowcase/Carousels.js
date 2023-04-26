import "./Carousels.css";
import HorizontalSlider from "../../../CustomComponents/Slider/HorizontalCarousel/HorizontalSlider";


import imagesDataSet from "../../../data/HomepageCarouselGifs/TableGrifs";

const imagesDir = require.context("../../../storage/gifs/tables", true);




const Carousels = () => {
  return (
    <div>
      <h1 className="TitleSection">Our Components</h1>
      <div className="ui-row-card">
        <div className="cardNew">
          <div className="card-body">
            <div>
              <div className="CardHeader">Tables</div>
              <div className="CardText">
                <p>
                  Tables are one of the most commonly used components in
                  dashboard and reporting systems. However, designing tables
                  having features such as sorting , filtering , Editing , etc
                  can be challenging and time-consuming, especially if you want
                  them to look and function the way you want.
                  <br />
                  <br />
                  To address this issue, we created simple tables using simple
                  JavaScript. We made sure to provide all the code, so
                  developers can easily copy and paste the code into their
                  projects and modify it according to their needs.
                  <br />
                  <br />
                  Compared to using components from frameworks, these simple
                  tables are easier to modify and customize, which can save time
                  and effort for developers. With our simple tables, developers
                  can implement their logic easily and get the desired results
                  in less time.
                  <br />
                  <br />
                </p>
              </div>


              <div>
                <HorizontalSlider imagesDataSet={imagesDataSet} imagesDir={imagesDir} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="card">
          <div className="card-body">
            <div className="iconAlign">
              <img
                src="https://cdn-icons-png.flaticon.com/512/8633/8633185.png"
                alt="RightSideImage"
                width="45px"
              />
            </div>
            <div>
              <div className="CardHeader">PopOver</div>
              <div className="CardText">
                lIrure nulla cupidatat qui commodo cupidatat ex sunt fugiat aute
                sint qui nulla cupidatat qui.
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Carousels;
