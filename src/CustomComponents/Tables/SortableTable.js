import { useEffect, useState } from "react";

const Sortable = ({
  data,
  columns,
  sortableCols,
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

  // useEffect(() => {
  //   setTabData([...data]);
  //   sortColumn("", true);
  // }, [recordsPerPage]);

  const changePage = (next) => {
    let page = next
      ? pageNo + 1 > pages
        ? pages
        : pageNo + 1
      : pageNo - 1 < 1
        ? 1
        : pageNo - 1;

    let start = Math.max((page - 1) * recordsPerPage, 0);
    let end = Math.min(page * recordsPerPage - 1, tabData.length - 1);

    console.log(start, end, pages, page);
    console.log(tabData.length);
    let tempDataArray = [];
    for (let index = start; index <= end; index++) {
      tempDataArray.push(tabData[index]);
    }

    setPageNo(page);
    setPageStartIndex(start);
    setPageEndIndex(end);
    setDatainPage(tempDataArray);
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

    let tempDataArray = [];
    for (let index = pageStartIndex; index <= pageEndIndex; index++) {
      tempDataArray.push(sortedData[index]);
    }
    setDatainPage(tempDataArray);
  };

  const recordSelectionPerPageChange = (noOfRecords) => {
    let start = 0;
    let end = Math.min(noOfRecords - 1, tabData.length - 1);

    let tempDataArray = [];
    for (let index = start; index <= end; index++) {
      tempDataArray.push(tabData[index]);
    }

    setRecordsPerPage(noOfRecords);
    setPages(Math.ceil(data.length / noOfRecords));
    setPageNo(1);
    setDatainPage(tempDataArray);
  };

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
