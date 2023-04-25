import { useState, useEffect } from "react";
import { getInputBoxFromType } from "../../../services/editTable";
import EditabrlStyle from "../Editable/Editable.module.css";
import { FaEdit } from "react-icons/fa";
import { FaPrescriptionBottleAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

import axios from "axios";
const Editable = ({
  data,
  columns,
  tableHeader,
  recordsPerPageOption,
  defaultRecordPerPage,
  uniqueId,
  editApi,
  deleteOneApi,
}) => {
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

  /* -----------------------------------API dependant code----------------------------------------------- */

  /* -------------------------------------------May modify according to users need------------------------ */

  // gettting data from the dp using api provided and adding it to thier respective page
  useEffect(() => {
    axios.get(process.env.REACT_APP_TEST_API).then((response) => {
      const tempDataFromDB = response.data;
      setTabData(tempDataFromDB);
      paginator(null, null, recordsPerPage, null, tempDataFromDB);
    });
  }, []);

  // method to update data wrt provided unique id using rest api
  const onUpdateConfirm = async () => {
    try {
      await axios.patch(
        (editApi ? editApi : process.env.REACT_APP_TEST_API) +
        "/" +
        selectedOneRowForEdit[uniqueId],
        selectedOneRowForEdit
      );
    } catch (e) {
      console.log(e);
    }

    // again getting update data after operation from the db
    let tempUpdatedData = await getDataFromDb();
    // setting paginator to put data to their respective page
    paginator(
      pageStartIndex,
      pageEndIndex,
      recordsPerPage,
      pageNo,
      tempUpdatedData
    );
    // closing the popup and clearing saved data to update
    setSelectedOneRowForEdit(null);
  };

  // method to delete data wrt provided unique id using rest api
  const onDeleteConfirm = async (selectedRow) => {
    try {
      await axios.delete(
        (deleteOneApi ? deleteOneApi : process.env.REACT_APP_TEST_API) +
        "/" +
        selectedRow[uniqueId]
      );
    } catch (e) {
      console.log(e);
    }

    // again getting update data after operation from the db
    let tempDataArr = await getDataFromDb();
    // since data is being delete , calculating again total pages and setting it to state
    let pagesLeftNow = Math.ceil(tempDataArr.length / recordsPerPage);
    let pageNumber = pagesLeftNow < pageNo ? pagesLeftNow : pageNo;
    paginator(null, null, recordsPerPage, pageNumber, tempDataArr);
    // clearing data selected for delete
    setSelectedOneRowForDelete(null);
  };

  // method to get data from database , eerytime any operation occurs
  const getDataFromDb = async () => {
    let response = await axios.get(process.env.REACT_APP_TEST_API);
    let tempDataFromDB = response.data;
    setTabData(tempDataFromDB);
    return tempDataFromDB;
  };

  /* -----------------------------------API dependant code ends----------------------------------------------- */

  /* -------------------------------------------May modify according to users need------------------------ */

  // method for setting paginator
  const paginator = (
    recordStartIndex,
    recordEndIndex,
    noOfRecords,
    currrPageNo,
    updatedDataSet
  ) => {
    //checking parameter is null or not, if null it means unchanged and get it from state
    currrPageNo = currrPageNo ? currrPageNo : 1; //curr page no
    noOfRecords = noOfRecords ? noOfRecords : defaultRecordPerPage; //records per page if null get default
    updatedDataSet = updatedDataSet ? updatedDataSet : tabData; //new data array,
    recordStartIndex = recordStartIndex
      ? recordStartIndex
      : Math.max((currrPageNo - 1) * noOfRecords, 0);
    recordEndIndex = recordEndIndex
      ? recordEndIndex
      : Math.min(currrPageNo * noOfRecords - 1, updatedDataSet.length - 1);

    // putting data into the current page no
    let tempDataArray = updatedDataSet.slice(
      recordStartIndex,
      recordEndIndex + 1
    );
    // setting various states
    setPages(Math.ceil(updatedDataSet.length / noOfRecords));
    setPageStartIndex(recordStartIndex);
    setPageEndIndex(recordEndIndex);
    setPageNo(currrPageNo);
    setDatainPage([...tempDataArray]);
  };

  // method to set page , add respective data to visible page
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
    let tempDataArray = [];
    for (let index = start; index <= end; index++) {
      tempDataArray.push(tabData[index]);
    }
    setPageNo(page);
    setPageStartIndex(start);
    setPageEndIndex(end);
    setDatainPage(tempDataArray);
  };

  // sorting selected columns
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

  // changing total no of records per page from the aoption passed in the props
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

  // select row to edit and open popup
  const editRow = (selectedOneRow) => {
    // EditOneRowPopUp
    // call edit popup form here
    // console.log(selectedOneRow)
    setSelectedOneRowForEdit(selectedOneRow);
  };

  //select row to be deleted and open popup for confirmation
  const deleteRow = (selectedOneRow) => {
    // Call confirmation popup here
    // DeleteOneRowPopUp
    setSelectedOneRowForDelete(selectedOneRow);
    console.log(selectedOneRow);
  };

  // close the popup on cancel
  const onUpdateCancel = () => {
    // clearing selected row for update
    setSelectedOneRowForEdit(null);
  };

  // close the popup on cancel
  const onDeleteCancel = () => {
    // clearing selected row for delete
    setSelectedOneRowForDelete(null);
  };

  // method to update data if anything changed in update data popup
  const editFormContentChange = (e) => {
    const { name, value } = e.target;
    setSelectedOneRowForEdit({ ...selectedOneRowForEdit, [name]: value });
  };

  return (
    <div className={EditabrlStyle.MainBody}>
      <div className={EditabrlStyle.frame}>
        {tableHeader && (
          <h2 className={EditabrlStyle.MainHeader}>{tableHeader}</h2>
        )}

        <>
          <div>
            {selectedOneRowForEdit && (
              <div className={EditabrlStyle.modal}>
                <div className={EditabrlStyle.modalcontent}>
                  <h3 className={EditabrlStyle.PopupHeader}>Popup Form</h3>
                  <div className={EditabrlStyle.Tdata}>
                    {columns.map((col, index) =>

                      getInputBoxFromType(
                        col,
                        selectedOneRowForEdit,
                        editFormContentChange,
                        index
                      )
                    )}
                  </div>
                  <div className={EditabrlStyle.PopupFooter}>
                    <button
                      className={EditabrlStyle.button33}
                      onClick={() => onUpdateConfirm()}
                    >
                      Update
                    </button>
                    <button
                      className={EditabrlStyle.button34}
                      onClick={() => onUpdateCancel()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>

        <>
          {selectedOneRowForDelete && (
            <div className={EditabrlStyle.modal}>
              <div className={EditabrlStyle.modalcontent}>
                Popup Delete , Are you sure want to delete id :{" "}
                {selectedOneRowForDelete[uniqueId]}
                <div className={EditabrlStyle.DeleteBtnAlign}>
                  <button
                    className={EditabrlStyle.PopupDelBtn}
                    onClick={() => onDeleteConfirm(selectedOneRowForDelete)}
                  >
                    Delete
                  </button>
                  <button className={EditabrlStyle.PopupCancelBtn} onClick={() => onDeleteCancel(selectedOneRowForDelete)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>

        <table>
          <tr>
            {columns.map((col, index) => (
              <th>
                {col.sortable ? (
                  <button
                    className={EditabrlStyle.TableHeaderText}
                    onClick={() =>
                      sortColumn(
                        col.column,
                        sortedColumn === col.column && sortedAsc === 1
                          ? false
                          : true
                      )
                    }
                  >
                    {col.columnLabel}{" "}
                    {col.column === sortedColumn && (
                      <span>
                        {sortedAsc === -1 && <i>&#8595;</i>}
                        {sortedAsc === 1 && <i>&#8593;</i>}
                      </span>
                    )}
                  </button>
                ) : (
                  col.columnLabel
                )}
              </th>
            ))}
            <th className={EditabrlStyle.TableHeaderText}>Edit</th>
            <th className={EditabrlStyle.TableHeaderText}>Delete</th>
          </tr>

          {datainPage &&
            datainPage.map((row) => {
              return (
                <tr>
                  {" "}
                  {columns.map((col) => (
                    <td>{row[col.column]}</td>
                  ))}{" "}
                  <td>
                    <button
                      className={EditabrlStyle.Editbtn}
                      onClick={() => editRow(row)}
                    >
                      {" "}
                      <div className={EditabrlStyle.EditBtn}>< FaPen /></div>
                    </button>
                  </td>
                  <td>
                    <button
                      className={EditabrlStyle.delbtn}
                      onClick={() => deleteRow(row)}
                    >
                      <div className={EditabrlStyle.DelBtn}><FaPrescriptionBottleAlt /></div>
                    </button>
                  </td>
                </tr>
              );
            })}
        </table>

        <div className={EditabrlStyle.TablePagination}>
          <button
            className={EditabrlStyle.PreNext_btn}
            onClick={() => changePage(false)}
          >
            &lt;
          </button>
          <span className={EditabrlStyle.PageNo}>{pageNo}</span>
          <button
            className={EditabrlStyle.PreNext_btn}
            onClick={() => changePage(true)}
          >
            &#62;
          </button>
          <select
            name="recordsPerPage"
            className={EditabrlStyle.PageOption}
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

export default Editable;