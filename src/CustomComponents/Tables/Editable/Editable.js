import { useState, useEffect } from "react";
import { getInputBoxFromType } from "../../../services/editTable"

import axios from "axios"
const Editable = ({ data,
  columns,
  tableHeader,
  recordsPerPageOption,
  defaultRecordPerPage,
  uniqueId }) => {

  const [recordsPerPage, setRecordsPerPage] = useState(defaultRecordPerPage);
  const [tabData, setTabData] = useState();
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortedAsc, setSortedAsc] = useState(0);
  const [pages, setPages] = useState(Math.ceil(data.length / recordsPerPage));
  const [pageNo, setPageNo] = useState(1);
  const [pageStartIndex, setPageStartIndex] = useState(0);
  const [pageEndIndex, setPageEndIndex] = useState(recordsPerPage - 1);
  const [datainPage, setDatainPage] = useState(
    data.filter((item, index) => index < recordsPerPage)
  );
  const [selectedOneRowForEdit, setSelectedOneRowForEdit] = useState();
  const [selectedOneRowForDelete, setSelectedOneRowForDelete] = useState();

  // useEffect(() => {
  //   setTabData([...data]);
  //   sortColumn("", true);
  // }, [pageStartIndex , pageEndIndex , ]);


  useEffect(() => {
    axios.get(process.env.REACT_APP_TEST_API).then((response) => {
      const tempDataFromDB = response.data
      setTabData(tempDataFromDB);
      paginator(null, null, recordsPerPage, null, tempDataFromDB)
    })
  }, []);




  const paginator = (recordStartIndex, recordEndIndex, noOfRecords, currrPageNo, sortedArrayData) => {
    currrPageNo = currrPageNo ? currrPageNo : 1;
    noOfRecords = noOfRecords ? noOfRecords : defaultRecordPerPage;
    sortedArrayData = sortedArrayData ? sortedArrayData : tabData;
    recordStartIndex = recordStartIndex ? recordStartIndex : Math.max((currrPageNo - 1) * noOfRecords, 0);
    recordEndIndex = recordEndIndex ? recordEndIndex : Math.min(currrPageNo * noOfRecords - 1, sortedArrayData.length - 1);

    let tempDataArray = sortedArrayData.slice(recordStartIndex, recordEndIndex + 1);

    setPages(Math.ceil(sortedArrayData.length / noOfRecords));
    setPageStartIndex(recordStartIndex);
    setPageEndIndex(recordEndIndex)
    setPageNo(currrPageNo);
    setDatainPage([...tempDataArray]);
  }



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


  const editRow = (selectedOneRow) => {
    // EditOneRowPopUp
    // call edit popup form here
    // console.log(selectedOneRow)
    setSelectedOneRowForEdit(selectedOneRow)
  }


  const deleteRow = (selectedOneRow) => {
    // Call confirmation popup here
    // DeleteOneRowPopUp
    setSelectedOneRowForDelete(selectedOneRow)
    console.log(selectedOneRow)
  }


  // const EditOneRowPopUp = ({ selectedRow }) => {
  // console.log("popv b", filterableColumns)
  // filterableCols.forEach(element => {
  //   console.log(element)
  // });
  // return <div className={"popup " + true ? "showpopup" : "hidepopup"}>
  //   <button onClick={() => closePopup()}>close</button>
  //   <div>        {
  //     filterableColumns.map((oneCol) =>
  //       <div><span>{oneCol.column} : </span><input value={oneCol.column} /></div>
  //     )
  //   }</div>
  // </div>

  // }


  // const DeleteOneRowPopUp = ({ selectedRow }) => {

  // }


  const getDataFromDb = async () => {

    let response = await axios.get(process.env.REACT_APP_TEST_API);
    let tempDataFromDB = response.data;
    setTabData(tempDataFromDB);
    return tempDataFromDB;
  }



  const onUpdateConfirm = async () => {
    try {
      await axios.patch(process.env.REACT_APP_TEST_API + "/" + selectedOneRowForEdit[uniqueId], selectedOneRowForEdit)
    } catch (e) {
      console.log(e)
    }

    let tempUpdatedData = await getDataFromDb()
    paginator(pageStartIndex, pageEndIndex, recordsPerPage, pageNo, tempUpdatedData)

    setSelectedOneRowForEdit(null);
  };



  const onUpdateCancel = () => {
    setSelectedOneRowForEdit(null)
  }



  const onDeleteConfirm = async (selectedRow) => {

    try {
      await axios.delete(process.env.REACT_APP_TEST_API + "/" + selectedRow[uniqueId])

    } catch (e) {
      console.log(e)
    }


    let tempDataArr = await getDataFromDb()

    let pagesLeftNow = Math.ceil(tempDataArr.length / recordsPerPage);
    let pageNumber = (pagesLeftNow < pageNo) ? pagesLeftNow : pageNo;

    paginator(null, null, recordsPerPage, pageNumber, tempDataArr);

    setSelectedOneRowForDelete(null);
  };

  const onDeleteCancel = () => {
    setSelectedOneRowForDelete(null)
  }

  const editFormContentChange = (e) => {

    const { name, value } = e.target
    setSelectedOneRowForEdit({ ...selectedOneRowForEdit, [name]: value })
  }

  return (
    <div>
      {tableHeader && <h2 className="tableHeader">{tableHeader}</h2>}

      <>
        {selectedOneRowForEdit &&

          <div>
            Popup Form
            {
              columns.map((col, index) => getInputBoxFromType(col, selectedOneRowForEdit, editFormContentChange, index))}

            <button onClick={() => onUpdateConfirm()}>Update</button>

            <button onClick={() => onUpdateCancel()}>Cancel</button>
          </div>
        }
      </>

      <>
        {
          selectedOneRowForDelete &&

          <div>
            Popup Delete , Are you sure want to delete id : {selectedOneRowForDelete[uniqueId]}
            <button onClick={() => onDeleteConfirm(selectedOneRowForDelete)}>Delete</button>
            <button onClick={() => onDeleteCancel(selectedOneRowForDelete)}>Cancel</button>
          </div>
        }
      </>



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
          <th>Edit</th>
          <th>Delete</th>
        </tr>

        {datainPage &&
          datainPage.map((row) => {
            return (
              <tr>
                {" "}
                {columns.map((col) => (
                  <td>{row[col.column]}</td>
                ))}{" "}
                <td><button onClick={() => editRow(row)}>Edit</button></td>

                <td><button onClick={() => deleteRow(row)}>Delete</button></td>
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

export default Editable;
