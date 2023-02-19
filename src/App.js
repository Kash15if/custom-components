import "./App.css";

import Sortable from "./CustomComponents/Tables/SortableTable";
import Filterable from "./CustomComponents/Tables/FilterableTable";
import Editable from "./CustomComponents/Tables/Editable";
import SortFilter from "./CustomComponents/Tables/Sort-Filter";
import AllTogether from "./CustomComponents/Tables/Sort-Filter-Edit";
import Crud from "./CustomComponents/Tables/CrudTable";
import CrudIe from "./CustomComponents/Tables/CRUDIE"
import ImportExport from "./CustomComponents/Tables/FileImportExport";

// importing data
import dummyData from "./data/data1";
import { useEffect, useState } from "react";

function App() {
  const [columns, setColumns] = useState();

  useEffect(() => {
    let tempCols = Object.keys(dummyData[0]).map((colName) =>
    ({
      column: colName, sortable: true, editable: true, filterable: true,
      formInputDetails: { defaultVal: "abcd", inputType: "text", radioLabel: "Please select your favorite Web language:", data: [{ label: "xyz", value: "abc" }, { label: "uvw", value: "def" }], min: 0, max: 5 }
      // if inut type is dropdown then [{ label: "xyz", value: "abc" }] 
      // if it it text then {placeholder: "xyz" , name: "name"}
      // if checkbox {label: "label" }
      // if date {min: "" , max: "" }
      // if int {min: "" , max: "" }
      // if textarea  {placeholder: "xyz" , name: "name" , lines: 2}
    }));
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

      {/* <div className="frame red">
        {dummyData && columns && (
          <Filterable data={dummyData}
            columns={columns}
            filterableCols={columns}
            tableHeader="Filter Table"
          />)}
      </div> */}

      {/* <div className="frame gray">
        {dummyData && columns && (
          <Editable
            data={dummyData}
            columns={columns}
            sortableCols={columns}
            tableHeader="Editable Table"
            recordsPerPageOption={[5, 10, 20]}
            defaultRecordPerPage={5}
            uniqueId="id"
          />
        )}
      </div> */}

      <div className="frame blue">
        {dummyData && columns && (
          <ImportExport
            data={dummyData}
            columns={columns}
            filterableCols={columns}
            sortableCols={columns}
            tableHeader="Editable Table"
            recordsPerPageOption={[5, 10, 20]}
            defaultRecordPerPage={5}
            uniqueId="id"
          />

        )}
      </div>



      {/* <div className="frame black">
        <SortFilter />
      </div> */}
    </div>
  );
}

export default App;
