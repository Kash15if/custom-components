import "./HomeHeader.css";

const HomeHeader = () => {
  return (
    <div className="container">
      <div className="ui-row">
        <div className="hero-content">
          <h1 className="caption">
            Elevate Your <br /> React Experience
          </h1>
          <p className="Text2">With Our Custom Build Components</p>
          <p className="Text3">
            We offer a wide range of custom-built components designed to enhance
            your web development experience. From tables with advanced sorting,
            filtering , import and export features, to carousels, cards, forms,
            popups, popovers, and collapse panels, our components are
            user-centric and easy to customize. Browse our library to take your
            project to the next level and easily customisable. Just copy, paste
            our component and use.
          </p>
          <button className="ClickMeBtn">Click Me</button>
        </div>
        <div className="hero-content">
          <img
            src="https://preview.colorlib.com/theme/seos/assets/img/hero/hero_right.png.webp"
            alt="RightSideImage"
            width="512px"
          />
        </div>
      </div>
      <div className="what-we-do we-padding">
        <div className="Title">
          <div className="TitleSection">What We Offer </div>
          <div className="MainContaner">
            <div className="ui-row-card">
              <div className="card">
                <div className="card-body">
                  <div className="iconAlign">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/8633/8633185.png"
                      alt="RightSideImage"
                      width="45px"
                    />
                  </div>
                  <div>
                    <div className="CardHeader">Tables</div>
                    <div className="CardText">
                      lIrure nulla cupidatat qui commodo cupidatat ex sunt
                      fugiat aute sint qui nulla cupidatat qui.
                    </div>
                    {/* <button className="CardBtn">View</button> */}
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="iconAlign">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/8633/8633185.png"
                      alt="RightSideImage"
                      width="45px"
                    />
                  </div>
                  <div>
                    <div className="CardHeader">Carousels</div>
                    <div className="CardText">
                      lIrure nulla cupidatat qui commodo cupidatat ex sunt
                      fugiat aute sint qui nulla cupidatat qui.
                    </div>
                    {/* <button className="CardBtn">View</button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="ui-row-card">
              <div className="card">
                <div className="card-body">
                  <div className="iconAlign">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/8633/8633185.png"
                      alt="RightSideImage"
                      width="45px"
                    />
                  </div>
                  <div>
                    <div className="CardHeader">Popups</div>
                    <div className="CardText">
                      lIrure nulla cupidatat qui commodo cupidatat ex sunt
                      fugiat aute sint qui nulla cupidatat qui.
                    </div>
                    {/* <button className="CardBtn">View</button> */}
                  </div>
                </div>
              </div>
              <div className="card">
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
                      lIrure nulla cupidatat qui commodo cupidatat ex sunt
                      fugiat aute sint qui nulla cupidatat qui.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="ui-row-card">
              <div className="card">
                <div className="card-body">
                  <div>Image</div>
                  <div>
                    <div>Text1</div>
                    <div>Some Text</div>
                    <button>View</button>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div>Image</div>
                  <div>
                    <div>Text2</div>
                    <div>Some Text</div>
                    <button>View</button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
