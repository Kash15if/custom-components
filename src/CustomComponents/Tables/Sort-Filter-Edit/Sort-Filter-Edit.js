import { useEffect, useState } from "react";
import axios from "axios"

import { getInputBoxFromType } from "../../../services/editTable";
import AllOneTable from "../Sort-Filter-Edit/SortFilterEditTableStyle.module.css";

import { FaPen } from "react-icons/fa";
import { FaPrescriptionBottleAlt } from "react-icons/fa";

//Icon
import { FaPlus } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";

const SortFilterEdit = ({
  columns,
  tableHeader,
  recordsPerPageOption,
  defaultRecordPerPage,
  uniqueId,
  getDataApi,
  editApi,
  deleteOneApi,
}) => {
  const [tabData, setTabData] = useState();
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortedAsc, setSortedAsc] = useState(0);
  const [valuesToBeFiltered, setValuesToBeFiltered] = useState();
  const [recordsPerPage, setRecordsPerPage] = useState(defaultRecordPerPage);
  const [pages, setPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageStartIndex, setPageStartIndex] = useState(0);
  const [pageEndIndex, setPageEndIndex] = useState(recordsPerPage - 1);
  const [datainPage, setDatainPage] = useState();
  const [selectedOneRowForEdit, setSelectedOneRowForEdit] = useState();
  const [selectedOneRowForDelete, setSelectedOneRowForDelete] = useState();




  // Add api to get data from the table everytime page loads
  // @dependant
  useEffect(() => {
    axios.get(getDataApi ? getDataApi : process.env.REACT_APP_TEST_API).then((response) => {
      const tempDataFromDB = response.data
      setTabData(tempDataFromDB);
      paginator(null, null, recordsPerPage, null, tempDataFromDB)
    })
  }, []);


  useEffect(() => {
    let filteredTempObj = {};
    columns.forEach((elemt) => {
      if (elemt.filterable) {
        filteredTempObj[elemt.column] = "";
      }
    });
    setValuesToBeFiltered(filteredTempObj);
  }, [columns]);


  // @dependant
  const getDataFromDb = async () => {
    let response = await axios.get(getDataApi ? getDataApi : process.env.REACT_APP_TEST_API);
    let tempDataFromDB = response.data;
    setTabData(tempDataFromDB);
    return tempDataFromDB;
  }



  const changeFilterableInputs = (e) => {
    const { name, value } = e.target;
    let tempFilteredStringObject = { ...valuesToBeFiltered, [name]: value };
    let filteredData = tabData.filter((itemRow) => {
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
      });

      return dataPresentInRow;
    });
    setValuesToBeFiltered(tempFilteredStringObject);
    paginator(null, null, recordsPerPage, 1, filteredData)
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

  const editFormContentChange = (e) => {
    const { name, value } = e.target;
    setSelectedOneRowForEdit({ ...selectedOneRowForEdit, [name]: value });
  };


  // @dependant
  const onUpdateConfirm = async () => {
    try {
      await axios.patch((editApi ? editApi : process.env.REACT_APP_TEST_API) + "/" + selectedOneRowForEdit[uniqueId], selectedOneRowForEdit)
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


  // @dependant
  const onDeleteConfirm = async (selectedRow) => {

    console.log(selectedRow, uniqueId, selectedRow[uniqueId])
    try {
      await axios.delete((deleteOneApi ? deleteOneApi : process.env.REACT_APP_TEST_API) + "/" + selectedRow[uniqueId])
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


  const editRow = (selectedOneRow) => {
    setSelectedOneRowForEdit(selectedOneRow);
  };


  const deleteRow = (selectedOneRow) => {
    setSelectedOneRowForDelete(selectedOneRow)
  }


  const changePage = (next) => {
    let page = next
      ? pageNo + 1 > pages
        ? pages
        : pageNo + 1
      : pageNo - 1 < 1
        ? 1
        : pageNo - 1;

    setPageNo(page);
    paginator(null, null, recordsPerPage, page, null);
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
      ? tabData.sort((row1, row2) =>
        row1[col] > row2[col] ? 1 : row1[col] < row2[col] ? -1 : 0
      )
      : tabData.sort((row1, row2) =>
        row1[col] > row2[col] ? -1 : row1[col] < row2[col] ? 1 : 0
      );

    setTabData([...sortedData]);
    paginator(pageStartIndex, pageEndIndex, recordsPerPage, pageNo, sortedData)
  };


  const recordSelectionPerPageChange = (noOfRecords) => {
    let start = 0;
    let end = Math.min(noOfRecords - 1, tabData.length - 1);
    let tempDataArray = [];
    for (let index = start; index <= end; index++) {
      tempDataArray.push(tabData[index]);
    }
    setPageStartIndex(start);
    setPageEndIndex(end);
    setRecordsPerPage(noOfRecords);
    setPageNo(1);
    setDatainPage(tempDataArray);
  };


  return (
    <div className={AllOneTable.MainBody}>
      <div className={AllOneTable.frame}>
        <>
          {selectedOneRowForEdit && (
            <div className={AllOneTable.modal}>
              <div className={AllOneTable.modalcontent}>
                <h3 className={AllOneTable.PopupHeader}>Popup Form</h3>
                <div className={AllOneTable.Tdata}>
                  {columns.map((col, index) =>
                    getInputBoxFromType(
                      col,
                      selectedOneRowForEdit,
                      editFormContentChange,
                      index
                    )
                  )}
                </div>
                <div className={AllOneTable.PopupFooter}>
                  <button
                    className={AllOneTable.button33}
                    onClick={() => onUpdateConfirm()}
                  >
                    Update
                  </button>
                  <button
                    className={AllOneTable.button34}
                    onClick={() => onUpdateCancel()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>

        <>
          {selectedOneRowForDelete && (
            <div className={AllOneTable.modal}>
              <div className={AllOneTable.modalcontent}>
                Popup Delete , Are you sure want to delete id :{" "}
                {selectedOneRowForDelete[uniqueId]}
                <div className={AllOneTable.DeleteBtnAlign}>
                  <button
                    className={AllOneTable.PopupDelBtn} onClick={() => onDeleteConfirm(selectedOneRowForDelete)}
                  >
                    Delete
                  </button>
                  <button className={AllOneTable.PopupCancelBtn} onClick={() => onDeleteCancel(selectedOneRowForDelete)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>

        {tableHeader && (
          <h2 className={AllOneTable.MainHeader}>{tableHeader}</h2>
        )}
        <table>
          <tr>
            {columns.map((col, index) => (
              <th>
                {col.sortable ? (
                  <button
                    className={AllOneTable.TableHeaderText}
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
            <th className={AllOneTable.TableHeaderText}>Edit</th>
            <th className={AllOneTable.TableHeaderText}>Delete</th>
          </tr>

          <tr>
            {columns &&
              valuesToBeFiltered &&
              columns.map((col, index) => (
                <th className={AllOneTable.FilterSection}>
                  {col.filterable ? (
                    <input
                      className={AllOneTable.FilterInput}
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
            <th></th>
            <th></th>
          </tr>

          {datainPage &&
            datainPage.map((row) => {
              return (
                <tr>
                  {columns.map((col) => (
                    <td>{row[col.column]}</td>
                  ))}
                  <td>
                    <button
                      className={AllOneTable.EditBtn}
                      onClick={() => editRow(row)}
                    >
                      {" "}
                      <div className={AllOneTable.EditBtn}>< FaPen /></div>
                    </button>
                  </td>

                  <td>
                    <button
                      className={AllOneTable.delbtn}
                      onClick={() => deleteRow(row)}
                    >
                      <div className={AllOneTable.DelBtn}><FaPrescriptionBottleAlt /></div>
                    </button>
                  </td>
                </tr>
              );
            })}
        </table>

        <div className={AllOneTable.TablePagination}>
          <button
            className={AllOneTable.PreNext_btn}
            onClick={() => changePage(false)}
          >
            &lt;
          </button>
          <span className={AllOneTable.PageNo}>{pageNo}</span>
          <button
            className={AllOneTable.PreNext_btn}
            onClick={() => changePage(true)}
          >
            &#62;
          </button>
          <select
            name="recordsPerPage"
            className={AllOneTable.PageOption}
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
  );
};

export default SortFilterEdit;