import "./App.css";

import Sortable from "./CustomComponents/Tables/SortableTable";
import Filterable from "./CustomComponents/Tables/FilterableTable";
import Editable from "./CustomComponents/Tables/Editable";
import SortFilter from "./CustomComponents/Tables/Sort-Filter";
import AllTogether from "./CustomComponents/Tables/Sort-Filter-Edit";

// importing data
import dummyData from "./data/data1";
import { useEffect, useState } from "react";

function App() {
  const [columns, setColumns] = useState();

  useEffect(() => {
    let tempCols = Object.keys(dummyData[0]).map((colName) => ({ column: colName, sortable: true, editable: false, filterable: false }));
    setColumns(tempCols);
    console.log(tempCols)
  }, []);

  return (
    <div className="App">
      <div className="frame">
        {dummyData && columns && (
          <Sortable
            data={dummyData}
            columns={columns}
            sortableCols={columns}
            tableHeader="Sortable Table"
            recordsPerPageOption={[5, 10, 20]}
            defaultRecordPerPage={5}
          />
        )}
      </div>

      <div className="frame red">
        {/* {dummyData && columns && (
        <Filterable  data={dummyData}
        columns={columns}
        filterableCols = {columns}
        tableHeader="Sortable Table"
      />)} */}
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
