import { useState, useEffect } from "react";


import CrudieStyle from "./Crudie.module.css";

import { read, utils, writeFile } from 'xlsx';

import axios from "axios"

import { getInputBoxFromType } from "../../../services/editTable";

const CRUDIE = ({
    columns,
    tableHeader,
    recordsPerPageOption,
    defaultRecordPerPage,
    uniqueId,
    excelImport,
    excelExport,
    jsonImport,
    jsonExport,
    getDataApi,
    createApi,
    uploadBulkApi,
    editApi,
    deleteOneApi,
    deleteMultipleApi,
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
    const [datainPage, setDatainPage] = useState()
    const [selectedOneRowForEdit, setSelectedOneRowForEdit] = useState();
    const [selectedOneRowForDelete, setSelectedOneRowForDelete] = useState();
    const [createNewRecordFormOpen, setCreateNewRecordFormOpen] = useState(false);
    const [multiSelectForDeleteList, setMultiSelectForDeleteList] = useState({})
    const [allRowsOfTableSelected, setAllRowsOfTableSelected] = useState(false);
    const [selectedMultipleRowForDeletePopup, setSelectedMultipleRowForDeletePopup] = useState(false);



    /* ---------------------------------------Dependant  Code------------------------------------------------------------ */
    /* ---------------------------------------Needs to be customized according to users req.------------------------------- */


    /* -------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!------------------------------- */





    // Add api to get data from the table everytime page loads
    // @dependant
    useEffect(() => {
        axios.get(getDataApi ? getDataApi : process.env.REACT_APP_TEST_API).then((response) => {
            const tempDataFromDB = response.data
            setTabData(tempDataFromDB);
            paginator(null, null, recordsPerPage, null, tempDataFromDB)
        })
    }, []);



    // @dependant
    const getDataFromDb = async () => {
        let response = await axios.get(getDataApi ? getDataApi : process.env.REACT_APP_TEST_API);
        let tempDataFromDB = response.data;
        setTabData(tempDataFromDB);
        return tempDataFromDB;
    }




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



    // @dependant
    const onDeleteConfirm = async (selectedRow) => {

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




    // @dependant
    const onAddNewRecord = async () => {
        try {
            await axios.post(createApi ? createApi : process.env.REACT_APP_TEST_API, selectedOneRowForEdit)
        } catch (e) {
            console.log(e)
        }
        let tempDataArr = await getDataFromDb();
        paginator(pageStartIndex, pageEndIndex, recordsPerPage, pageNo, tempDataArr)
        setSelectedOneRowForEdit(null);
    };




    // @dependant
    const deleteAllSelected = async () => {
        try {
            await axios.post(deleteMultipleApi ? deleteMultipleApi : (process.env.REACT_APP_TEST_API + "/delete-multiple"), Object.keys(multiSelectForDeleteList))
            let tempDataArr = await getDataFromDb();
            let pagesLeftNow = Math.ceil(tempDataArr.length / recordsPerPage);
            let pageNumber = (pagesLeftNow < pageNo) ? pagesLeftNow : pageNo;
            paginator(null, null, recordsPerPage, pageNumber, tempDataArr);
        }
        catch (error) {
            console.log(error);
        }
        // setTabData(tempDataArr);
        setMultiSelectForDeleteList({});
        setSelectedMultipleRowForDeletePopup(false);
        setAllRowsOfTableSelected(false)
    }




    // @dependant
    const onExcelImport = (e) => {
        const files = e.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = async (e) => {
                const workbook = read(e.target.result);
                const sheets = workbook.SheetNames;
                if (sheets.length) {
                    try {
                        const rows = utils.sheet_to_json(workbook.Sheets[sheets[0]]);
                        await axios.post(uploadBulkApi ? uploadBulkApi : (process.env.REACT_APP_TEST_API + "/bulkData"), rows);
                        let tempDataArr = await getDataFromDb();
                        paginator(null, null, recordsPerPage, null, tempDataArr);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    // @dependant
    const onJsonImport = async (e) => {

        const files = e.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = async (e) => {
                const content = e.target.result;
                const newDataSetFromJSON = JSON.parse(content); // parse json 
                try {
                    await axios.post(uploadBulkApi ? uploadBulkApi : (process.env.REACT_APP_TEST_API + "/bulkData"), newDataSetFromJSON);
                    let tempDataArr = await getDataFromDb();
                    paginator(null, null, recordsPerPage, null, tempDataArr);
                }
                catch (e) {
                    console.log(e)
                }
            }
            reader.readAsText(file);
        }
    }


    /* --------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!---------------------------- */

    /* ---------------------------------------Dependant Code Ends----------------------------------------------------------- */




    /* ---------------------------------------These code doenot have any dependency on APi or anything----------------------------------------------------------- */



    useEffect(() => {
        let filteredTempObj = {};
        columns.forEach((elemt) => {
            if (elemt.filterable) {
                filteredTempObj[elemt.column] = "";
            }
        });
        setValuesToBeFiltered(filteredTempObj);
    }, [columns]);



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


    const editFormContentChange = (e) => {
        const { name, value } = e.target;
        setSelectedOneRowForEdit({ ...selectedOneRowForEdit, [name]: value });
    };

    const onUpdateCancel = () => {
        setSelectedOneRowForEdit(null);
    };

    const onDeleteCancel = () => {
        setSelectedOneRowForDelete(null);
    };

    const editRow = (selectedOneRow) => {
        setCreateNewRecordFormOpen(false);
        setSelectedOneRowForEdit(selectedOneRow);
    };

    const deleteRow = (selectedOneRow) => {
        setSelectedOneRowForDelete(selectedOneRow);
    };

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

    const createNewRecord = () => {

        let inputFormData = {};
        columns.forEach((col) => {
            inputFormData[col.column] =
                col.formInputDetails && col.formInputDetails.defaultVal
                    ? col.formInputDetails.defaultVal
                    : "";
        });
        setSelectedOneRowForEdit({ ...inputFormData });
        setCreateNewRecordFormOpen(true);
    };


    const onMulitSelectChange = (e, selectedRow, selectAllTogle) => {
        // const checkedVal = e.target.checked;

        if (e.target.name === "selectAllCheckBox") {
            if (Object.keys(multiSelectForDeleteList).length || allRowsOfTableSelected) {
                setMultiSelectForDeleteList({});
                setAllRowsOfTableSelected(false)
            }
            else {
                let tempMultiDeleteList = {};
                tabData.forEach(eachRow => {
                    tempMultiDeleteList[eachRow[uniqueId]] = true;
                })
                setMultiSelectForDeleteList(tempMultiDeleteList);
                setAllRowsOfTableSelected(true)
            }
            return;
        }
        let rowId = selectedRow[uniqueId]
        if (multiSelectForDeleteList[rowId]) {
            let tempMultiDeleteList = multiSelectForDeleteList;
            delete multiSelectForDeleteList[rowId];
            setMultiSelectForDeleteList({ ...tempMultiDeleteList })
            setAllRowsOfTableSelected(false)
        }
        else {
            if (Object.keys(multiSelectForDeleteList).length === tabData.length - 1)
                setAllRowsOfTableSelected(true);
            setMultiSelectForDeleteList({ ...multiSelectForDeleteList, [rowId]: true })
        }
    }

    // method for setting paginator
    const paginator = (recordStartIndex, recordEndIndex, noOfRecords, currrPageNo, updatedDataSet) => {

        //checking parameter is null or not, if null it means unchanged and get it from state
        currrPageNo = currrPageNo ? currrPageNo : 1;//curr page no
        noOfRecords = noOfRecords ? noOfRecords : defaultRecordPerPage;//records per page if null get default
        updatedDataSet = updatedDataSet ? updatedDataSet : tabData; //new data array, 
        recordStartIndex = recordStartIndex ? recordStartIndex : Math.max((currrPageNo - 1) * noOfRecords, 0);
        recordEndIndex = recordEndIndex ? recordEndIndex : Math.min(currrPageNo * noOfRecords - 1, updatedDataSet.length - 1);

        // putting data into the current page no
        let tempDataArray = updatedDataSet.slice(recordStartIndex, recordEndIndex + 1);
        // setting various states
        setPages(Math.ceil(updatedDataSet.length / noOfRecords));
        setPageStartIndex(recordStartIndex);
        setPageEndIndex(recordEndIndex)
        setPageNo(currrPageNo);
        setDatainPage([...tempDataArray]);
    }


    const onExcelExport = () => {
        const headings = [columns.map(oneCol => oneCol.column)];
        const workbook = utils.book_new();
        const worksheet = utils.json_to_sheet([]);
        utils.sheet_add_aoa(worksheet, headings);
        utils.sheet_add_json(worksheet, tabData, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(workbook, worksheet, tableHeader || "Dataset");
        writeFile(workbook, tableHeader + ".xlsx" || 'Report.xlsx');
    }

    const onJsonExport = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(tabData)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = tableHeader + ".json";
        link.click();
    };

    return <div className={CrudieStyle.MainBody}>
        <div className={CrudieStyle.frame}>
            <>
                <button onClick={createNewRecord}>Create New</button>
                <button onClick={() => setSelectedMultipleRowForDeletePopup(true)}>Delete</button>
            </>

            <>
                {excelImport && <div>
                    <input id="excelImportBtn" type="file" onChange={onExcelImport} name="excel import" />
                    <label className="" htmlFor="excelImportBtn">Choose Excel</label>
                </div>
                }
                {jsonImport && <div>
                    <input type="file" id="jsonImportBtn" onChange={onJsonImport} />
                    <label className="" htmlFor="jsonImportBtn">Choose JSOn</label>
                </div>
                }
                <div>
                    {
                        excelExport && <button onClick={onExcelExport} className="btn">
                            Export Excel<i className="fa fa-download"></i>
                        </button>
                    }
                    {jsonExport && <button onClick={onJsonExport} className="btn">
                        Export JSON
                    </button>
                    }
                </div>
            </>



            <>
                {selectedOneRowForEdit && (
                    <div>
                        Popup Form
                        {columns.map((col, index) =>
                            getInputBoxFromType(
                                col,
                                selectedOneRowForEdit,
                                editFormContentChange,
                                index
                            )
                        )}
                        {createNewRecordFormOpen ? (
                            <button onClick={() => onAddNewRecord()}>Create New</button>
                        ) : (
                            <button onClick={() => onUpdateConfirm()}>Update</button>
                        )}
                        <button onClick={() => onUpdateCancel()}>Cancel</button>
                    </div>
                )}
            </>

            <>
                {selectedOneRowForDelete && (
                    <div>
                        Popup Delete , Are you sure want to delete id :{" "}
                        {selectedOneRowForDelete[uniqueId]}
                        <button onClick={() => onDeleteConfirm(selectedOneRowForDelete)}>
                            Delete
                        </button>
                        <button onClick={() => onDeleteCancel(selectedOneRowForDelete)}>
                            Cancel
                        </button>
                    </div>
                )}
            </>

            <>
                {selectedMultipleRowForDeletePopup && (
                    <div>
                        <h3>Popup Delete , Are you sure want to delete id all selected data.</h3>
                        <h4>No of rows to be deleteted :- {Object.keys(multiSelectForDeleteList).length}</h4>
                        <button onClick={deleteAllSelected}>
                            Delete
                        </button>
                        <button onClick={() => setSelectedMultipleRowForDeletePopup(false)}>
                            Cancel
                        </button>
                    </div>
                )}
            </>

            {tableHeader && <h2 className="tableHeader">{tableHeader}</h2>}
            <table>

                <tr>
                    <th>Select</th>
                    {columns.map((col, index) => (
                        <th>
                            {col.sortable ? <button onClick={() => sortColumn(col.column, (sortedColumn === col.column && sortedAsc === 1) ? false : true)}>
                                {col.columnLabel}{" "}
                                {
                                    col.column === sortedColumn && <span>
                                        {sortedAsc === -1 && <i>&#8595;</i>}
                                        {sortedAsc === 1 && <i >&#8593;</i>}
                                    </span>
                                }
                            </button>
                                : col.columnLabel


                            }
                        </th>
                    ))}
                    <th>Edit</th>
                    <th>Delete</th>

                </tr>

                <tr>
                    <th><input type="checkbox" id="checkBox_selectAll" name="selectAllCheckBox"
                        checked={allRowsOfTableSelected}
                        onChange={(e) => onMulitSelectChange(e, {})} />
                    </th>
                    {columns &&
                        valuesToBeFiltered &&
                        columns.map((col, index) => (

                            <th>
                                {col.filterable ? (
                                    <input
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
                        let tempUniqueId = row[uniqueId]
                        return (
                            <tr>
                                <td><input type="checkbox" id={"checkBox_" + row[uniqueId]} name="selectCheckBox"
                                    checked={multiSelectForDeleteList[tempUniqueId] ? true : false}
                                    onChange={(e) => onMulitSelectChange(e, row)} /></td>
                                {columns.map((col) => (
                                    <td>{row[col.column]}</td>
                                ))}
                                <td>
                                    <button onClick={() => editRow(row)}>Edit</button>
                                </td>

                                <td>
                                    <button onClick={() => deleteRow(row)}>Delete</button>
                                </td>
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
    </div>
        ;
}

export default CRUDIE;