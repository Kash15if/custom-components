import "./UpcomingComp.css";
const UpcomingComp = () => {
  return (
    <div>
      <div className="ui-row-card">
        <div className="cardNew">
          <div className="card-body">
            <div>
              <div className="CardHeaderNew">Upcoming Components</div>
              <div className="CardText">
                <ol>
                  <li>MultiHeader Table</li>
                  <li>Carousels</li>
                  <li>Collapsible</li>
                  <li>Dynamic Navbar</li>
                  {/* <li>Diagram</li> */}
                  {/* <li>Colorpicker</li> */}
                  {/* <li>Dynamic Form</li> */}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingComp;
