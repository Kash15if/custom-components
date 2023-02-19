import { useState } from "react";

const Sortable = ({
  data,
  columns,
  tableHeader,
  recordsPerPageOption,
  defaultRecordPerPage,
}) => {
  const [recordsPerPage, setRecordsPerPage] = useState(defaultRecordPerPage);
  const [tabData, setTabData] = useState(data);
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortedAsc, setSortedAsc] = useState(0);
  const [pages, setPages] = useState(Math.ceil(data.length / recordsPerPage));
  const [pageNo, setPageNo] = useState(1);
  const [pageStartIndex, setPageStartIndex] = useState(0);
  const [pageEndIndex, setPageEndIndex] = useState(recordsPerPage - 1);
  const [datainPage, setDatainPage] = useState(
    data.filter((item, index) => index < recordsPerPage)
  );


  const changePage = (next) => {
    let page = next
      ? pageNo + 1 > pages
        ? pages
        : pageNo + 1
      : pageNo - 1 < 1
        ? 1
        : pageNo - 1;

    setDataForSelectedPage(null, null, recordsPerPage, page, null)
  };

  const sortColumn = (col, asc) => {
    if (asc) {
      setSortedAsc(1);
    } else {
      setSortedAsc(-1);
    }

    if (sortedColumn !== col) {
      setSortedAsc(1);
      setSortedColumn(col);
    }
    let sortedData = asc
      ? data.sort((row1, row2) =>
        row1[col] > row2[col] ? 1 : row1[col] < row2[col] ? -1 : 0
      )
      : data.sort((row1, row2) =>
        row1[col] > row2[col] ? -1 : row1[col] < row2[col] ? 1 : 0
      );

    setTabData([...sortedData]);

    setDataForSelectedPage(pageStartIndex, pageEndIndex, recordsPerPage, pageNo, sortedData)
  };

  const recordSelectionPerPageChange = (noOfRecords) => {

    setDataForSelectedPage(null, null, noOfRecords, null, null)
    setRecordsPerPage(noOfRecords)

  };

  const setDataForSelectedPage = (recordStartIndex, recordEndIndex, noOfRecords, currrPageNo, sortedArrayData) => {

    currrPageNo = currrPageNo ? currrPageNo : 1;
    noOfRecords = noOfRecords ? noOfRecords : defaultRecordPerPage;
    sortedArrayData = sortedArrayData ? sortedArrayData : tabData;

    recordStartIndex = recordStartIndex ? recordStartIndex : Math.max((currrPageNo - 1) * noOfRecords, 0);
    recordEndIndex = recordEndIndex ? recordEndIndex : Math.min(currrPageNo * noOfRecords - 1, tabData.length - 1);


    let tempDataArray = sortedArrayData.slice(recordStartIndex, recordEndIndex + 1);

    setPages(Math.ceil(sortedArrayData.length / noOfRecords));
    setPageStartIndex(recordStartIndex);
    setPageEndIndex(recordEndIndex)
    setPageNo(currrPageNo);
    setDatainPage([...tempDataArray]);

  }

  return (
    <div>
      {tableHeader && <h2 className="tableHeader">{tableHeader}</h2>}
      <table>
        <tr>
          {columns.map((col, index) => (
            <th>
              {col.sortable ? (
                <button
                  onClick={() =>
                    sortColumn(
                      col.column,
                      sortedColumn === col.column && sortedAsc === 1
                        ? false
                        : true
                    )
                  }
                >
                  {col.column}{" "}
                  {col.column === sortedColumn && (
                    <span>
                      {sortedAsc === -1 && <i>&#8595;</i>}
                      {sortedAsc === 1 && <i>&#8593;</i>}
                    </span>
                  )}
                </button>
              ) : (
                col.column
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
      </table>

      <button onClick={() => changePage(true)}>Next</button>
      <span>PageNo:- {pageNo}</span>
      <button onClick={() => changePage(false)}>Prev</button>

      <select
        name="recordsPerPage"
        onChange={(e) => recordSelectionPerPageChange(e.target.value)}
        value={recordsPerPage}
      >
        {recordsPerPageOption.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default Sortable;
