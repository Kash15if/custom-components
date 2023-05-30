import "./App.css";

// import Sortable from "./CustomComponents/Tables/Sortable/SortableTable";
// import Filterable from "./CustomComponents/Tables/Filterable/FilterableTable";
// import Editable from "./CustomComponents/Tables/Editable/Editable";
// import SortFilter from "./CustomComponents/Tables/Sort-Filter/Sort-Filter";
// import AllTogether from "./CustomComponents/Tables/Sort-Filter-Edit/Sort-Filter-Edit";
// import Crud from "./CustomComponents/Tables/Extras/CrudTable";
// import CrudIe from "./CustomComponents/Tables/CRUDIE/CRUDIE"
// import ImportExport from "./CustomComponents/Tables/Extras/FileImportExport";
// import Expandable from "./CustomComponents/Tables/ExpanedTable/ExpandedUsingRecursion"

// // importing data
import dummyData from "./data/data1";
import expandableTableDataForComp from "./data/expandableWithComponent";
import expandableTableData from "./data/expandableData";
import { useEffect, useState } from "react";
import navData from "./data/NavbarData";
// import CRUDIE from "./CustomComponents/Tables/CRUDIE/CRUDIE";

// import HorizontalSLider from "./CustomComponents/Slider/HorizontalCarousel/HorizontalSlider"

import Sliders from "./Pages/Sliders";
import Popups from "./Pages/Popups";
import Alerts from "./Pages/Alerts"
import Popover from "./Pages/Popover";
import Forms from "./Pages/Form";
import Tables from "./Pages/Tables";
import Home from "./Pages/Homepage";

import Footer from "./Components/Footer/Footer";

import Cards from "./Pages/Cards";
import { Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Collapse from "./Pages/Collapse";

function App() {


  const [columns, setColumns] = useState();
  const [data, setData] = useState(dummyData)
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

    tempCols.innerColumns = [
      {
        column: "current_address", sortable: true, filterable: true,

      }, {
        column: "permanent_address", sortable: true, filterable: true,

      },

    ]

    tempCols.innerColumns.innerColumns = [{
      column: "current_address", sortable: true, filterable: true,

    }, {
      column: "permanent_address", sortable: true, filterable: true,

    },]
    setColumns(tempCols);
    console.log(tempCols)
  }, []);


  const upDateData = (newaData) => {
    setData(newaData);
  }
  return (
    <div>


      <Navbar data={navData} />

      <Routes>


        <Route path="/" element={<Home />} />


        <Route path="/tables" element={dummyData && columns && <Tables dummyData={dummyData} data={data}
          upDateData={upDateData}
          columns={columns}
          colmns={columns}
          expandableTableData={expandableTableData}
          expandableTableDataForComp={expandableTableDataForComp}
        />} />

        <Route path="/popups" element={<Popups />} />
        <Route path="/sliders" element={<Sliders />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/popovers" element={<Popover />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/collapse" element={<Collapse />} />
      </Routes>

      <Footer />
    </div>

  );
}

export default App;