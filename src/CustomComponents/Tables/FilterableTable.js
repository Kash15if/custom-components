

import { useEffect, useState } from "react";
import "./FilterableTable.css"





const FilterableTable = ({ data, columns, filterableCols, tableHeader }) => {
  const [tabData, setTabData] = useState(data);
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortedAsc, setSortedAsc] = useState(0);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [valuesToBeFiltered, setValuesToBeFiltered] = useState();
  // const [filterStrings, setFilterString] = useState();




  useEffect(() => {
    let filteredTempObj = {};
    filterableCols.forEach((elemt) => {
      if (elemt.filterable) {
        filteredTempObj[elemt.column] = "";
      }
    })

    setValuesToBeFiltered(filteredTempObj)
  }, [])


  const changeFilterableInputs = (e) => {

    const { name, value } = e.target;

    let tempFilteredStringObject = { ...valuesToBeFiltered, [name]: value }


    // filterLogic to be implemented here
    // let filteredData = tabData.filter((itemRow) => {
    //   return filterableColumn.some((colName, index) =>
    //     itemRow[colName].toString().includes(filterText.toString())
    //   );
    // });

    // setData(filteredData);

    setValuesToBeFiltered(tempFilteredStringObject)
    // console.log({ ...valuesToBeFiltered, [name]: value })
    // console.log(e.target.name, e.target.value)
  }

  // const PopUp = ({ filterableColumns }) => {
  //   // console.log("popv b", filterableColumns)
  //   filterableCols.forEach(element => {
  //     console.log(element)
  //   });

  //   return <div className={"popup " + true ? "showpopup" : "hidepopup"}>
  //     <button onClick={() => closePopup()}>close</button>
  //     <div>        {
  //       filterableColumns.map((oneCol) =>
  //         <div><span>{oneCol.column} : </span><input value={oneCol.column} /></div>

  //       )
  //     }</div>


  //   </div>

  // }



  // const closePopup = () => {
  //   setPopupVisibility(!popupVisibility);
  // }

  // const sortColumn = (col, asc) => {

  //   if (asc) {
  //     setSortedAsc(1);
  //   }
  //   else {
  //     setSortedAsc(-1);
  //   }

  //   if (sortedColumn !== col) {

  //     setSortedAsc(1);
  //     setSortedColumn(col);
  //   }
  //   let sortedData = asc
  //     ? data.sort((row1, row2) => (row1[col] > row2[col]) ? 1 : (row1[col] < row2[col]) ? -1 : 0)
  //     : data.sort((row1, row2) => (row1[col] > row2[col]) ? -1 : (row1[col] < row2[col]) ? 1 : 0)


  //   setTabData([...sortedData]);
  // };

  return (
    <div>

      {tableHeader && <h2 className="tableHeader">{tableHeader}</h2>}
      <table>
        <tr>
          {columns.map((col, index) => (
            <th>
              {/* {col.sortable ? <button onClick={() => sortColumn(col.column, (sortedColumn === col.column && sortedAsc === 1) ? false : true)}>
                {col.column}{" "}
                {
                  col.column === sortedColumn && <span>
                    {sortedAsc === -1 && <i>&#8595;</i>}
                    {sortedAsc === 1 && <i >&#8593;</i>}
                  </span>
                }
              </button>
                : col.column


              } */}
              {col.column}
            </th>
          ))}
        </tr>

        <tr>
          {columns && valuesToBeFiltered && columns.map((col, index) => (
            <th>
              {col.filterable ?
                <input placeholder={col.column} value={valuesToBeFiltered[col.column]}
                  name={col.column}
                  onChange={(e) => changeFilterableInputs(e)}
                />
                : <input disabled />


              }
            </th>
          ))}
        </tr>

        {tabData &&
          tabData.map((row) => {
            return (
              <tr>
                {" "}
                {columns.map((col) => (
                  <td>{row[col.column]}</td>
                ))}{" "}
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default FilterableTable;

