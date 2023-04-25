import { useEffect, useState } from "react";
import FilterTableStyle from "../Filterable/FilterableTable.module.css";

const FilterableTable = ({ data, columns, filterableCols, tableHeader,
  recordsPerPageOption,
  defaultRecordPerPage, }) => {
  const [recordsPerPage, setRecordsPerPage] = useState(defaultRecordPerPage);
  const [tabData, setTabData] = useState(data);
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortedAsc, setSortedAsc] = useState(0);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [valuesToBeFiltered, setValuesToBeFiltered] = useState();
  const [filterableColumn, setFilterableColumn] = useState(columns.filter(col => col.filterable));
  const [pages, setPages] = useState(Math.ceil(data.length / recordsPerPage));
  const [pageNo, setPageNo] = useState(1);
  const [pageStartIndex, setPageStartIndex] = useState(0);
  const [pageEndIndex, setPageEndIndex] = useState(recordsPerPage - 1);
  const [datainPage, setDatainPage] = useState(
    data.filter((item, index) => index < recordsPerPage)
  );
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

    console.log(tempFilteredStringObject)
    // filterLogic to be implemented here

    let filteredData = data.filter((itemRow) => {

      let dataPresentInRow = true;
      columns.forEach((cols, index) => {

        let columnName = cols.column;
        let columnData = itemRow && itemRow[columnName] ? itemRow[columnName].toString().toLowerCase() : "";

        if (
          cols.filterable &&
          tempFilteredStringObject[columnName] !== "" &&
          !columnData.includes(tempFilteredStringObject[columnName].toLowerCase())
        ) {
          dataPresentInRow = false;
        }
      })

      return dataPresentInRow;

    });

    setTabData([...filteredData]);
    setValuesToBeFiltered(tempFilteredStringObject)

    paginator(null, null, null, null, filteredData)
  }

  const changePage = (next) => {
    let page = next
      ? pageNo + 1 > pages
        ? pages
        : pageNo + 1
      : pageNo - 1 < 1
        ? 1
        : pageNo - 1;

    paginator(null, null, recordsPerPage, page, null)
  };


  const recordSelectionPerPageChange = (noOfRecords) => {
    paginator(null, null, noOfRecords, null, null)
    setRecordsPerPage(noOfRecords)
  };

  const paginator = (recordStartIndex, recordEndIndex, noOfRecords, currrPageNo, sortedArrayData) => {

    currrPageNo = currrPageNo ? currrPageNo : 1;
    noOfRecords = noOfRecords ? noOfRecords : defaultRecordPerPage;
    sortedArrayData = sortedArrayData ? sortedArrayData : tabData;

    recordStartIndex = recordStartIndex ? recordStartIndex : Math.max((currrPageNo - 1) * noOfRecords, 0);
    recordEndIndex = recordEndIndex ? recordEndIndex : Math.min(currrPageNo * noOfRecords - 1, sortedArrayData.length - 1);

    console.log(recordStartIndex, recordEndIndex, noOfRecords, currrPageNo, sortedArrayData)

    let tempDataArray = sortedArrayData.slice(recordStartIndex, recordEndIndex + 1);

    setPages(Math.ceil(sortedArrayData.length / noOfRecords));
    setPageStartIndex(recordStartIndex);
    setPageEndIndex(recordEndIndex)
    setPageNo(currrPageNo);
    setDatainPage([...tempDataArray]);

  }


  return (
    <div>
      <div className={FilterTableStyle.MainBody}>
        <div className={FilterTableStyle.frame}>
          {tableHeader && (
            <h2 className={FilterTableStyle.MainHeader}>{tableHeader}</h2>
          )}
          <table>
            <tr>
              {columns.map((col, index) => (
                <th className={FilterTableStyle.TableHeaderFont}>

                  {col.columnLabel}
                </th>
              ))}
            </tr>

            <tr>
              {columns &&
                valuesToBeFiltered &&
                columns.map((col, index) => (
                  <th className={FilterTableStyle.FilterSection}>
                    {col.filterable ? (
                      <input
                        className={FilterTableStyle.FilterInput}
                        placeholder={col.column}
                        value={valuesToBeFiltered[col.column]}
                        name={col.column}
                        onChange={(e) => changeFilterableInputs(e)}
                      />
                    ) : (
                      <input disabled />
                    )}
                  </th>
                ))}
            </tr>

            {datainPage &&
              datainPage.map((row) => {
                return (
                  <tr>
                    {" "}
                    {columns.map((col) => (
                      <td>{row[col.column]}</td>
                    ))}{" "}
                  </tr>
                );
              })}
          </table>{" "}
          <div className={FilterTableStyle.TablePagination}>
            <button
              className={FilterTableStyle.PAgebtn}
              onClick={() => changePage(false)}
            >
              &lt;
            </button>
            <span className={FilterTableStyle.PageNo}>{pageNo}</span>
            <button
              className={FilterTableStyle.PAgebtn}
              onClick={() => changePage(true)}
            >
              &#62;
            </button>
            <select
              name="recordsPerPage"
              className={FilterTableStyle.PageOption}
              onChange={(e) => recordSelectionPerPageChange(e.target.value)}
              value={recordsPerPage}
            >
              {recordsPerPageOption.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterableTable;