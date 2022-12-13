import "./App.css";

import Sortable from "./CustomComponents/Tables/SortableTable";
import Filterable from "./CustomComponents/Tables/FilterableTable";
import Editable from "./CustomComponents/Tables/Editable";
import SortFilter from "./CustomComponents/Tables/Sort-Filter";
import AllTogether from "./CustomComponents/Tables/Sort-Filter-Edit";

// importing data
import dummyData from "./data/data1";
function App() {
  return (
    <div className="App">
      <div className="frame">
        <Sortable data={dummyData} />
      </div>

      <div className="frame red">
        <Filterable />
      </div>

      <div className="frame gray">
        <Editable />
      </div>

      <div className="frame blue">
        <SortFilter />
      </div>

      <div className="frame black">
        <AllTogether />
      </div>
    </div>
  );
}

export default App;
