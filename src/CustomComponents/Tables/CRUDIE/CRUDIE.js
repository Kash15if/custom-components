import { useState, useEffect } from "react";


import CrudieStyle from "./Crudie.module.css";

import { read, utils, writeFile } from 'xlsx';

import axios from "axios"

import { getInputBoxFromType } from "../../../services/editTable";

const CRUDIE = ({
    data,
    columns,
    filterableCols,
    sortableCols,
    tableHeader,
    recordsPerPageOption,
    defaultRecordPerPage,
    uniqueId, upDateData
}) => {

    const [tabData, setTabData] = useState();
    const [sortedColumn, setSortedColumn] = useState("");
    const [sortedAsc, setSortedAsc] = useState(0);
    const [valuesToBeFiltered, setValuesToBeFiltered] = useState();
    const [filterableColumn, setFilterableColumn] = useState(
        columns.filter((col) => col.filterable)
    );
    // const [filterStrings, setFilterString] = useState();

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


    // API will be called for CRUD operation
    useEffect(() => {

        axios.get(process.env.REACT_APP_TEST_API).then((response) => {
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

        // const tempData = data.map(itemRow => ({ ...itemRow, selectedCurrentRow: false }))
        // setTabData(tempData);
        setValuesToBeFiltered(filteredTempObj);

        // paginator(null, null, recordsPerPage, 1, tempData);


    }, []);


    const getDataFromDb = async () => {
        console.log("getting vl")
        // call api here first time

        let response = await axios.get(process.env.REACT_APP_TEST_API);
        let tempDataFromDB = response.data;
        setTabData(tempDataFromDB);
        // console.log(tempDataFromDB)
        return tempDataFromDB;

    }


    const changeFilterableInputs = (e) => {
        const { name, value } = e.target;

        console.log(name, value)
        // console.log(valuesToBeFiltered, "values")
        let tempFilteredStringObject = { ...valuesToBeFiltered, [name]: value };

        // filterLogic to be implemented here
        let filteredData = tabData.filter((itemRow) => {
            let dataPresentInRow = true;
            columns.forEach((cols, index) => {
                let columnName = cols.column;
                console.log(cols)
                console.log(columns)
                console.log(itemRow, itemRow[cols])
                let columnData = itemRow[columnName].toString().toLowerCase();

                if (
                    cols.filterable &&
                    tempFilteredStringObject[columnName] !== "" &&
                    !columnData.includes(tempFilteredStringObject[columnName].toLowerCase())
                ) {
                    console.log(tempFilteredStringObject[columnName], columnData);
                    dataPresentInRow = false;
                }
            });

            return dataPresentInRow;
        });

        setValuesToBeFiltered(tempFilteredStringObject);

        paginator(null, null, recordsPerPage, 1, filteredData)

        // setTabData([...filteredData]);
    };


    const editFormContentChange = (e) => {
        const { name, value } = e.target;
        setSelectedOneRowForEdit({ ...selectedOneRowForEdit, [name]: value });
    };

    const onUpdateConfirm = async () => {
        // let tempUpdatedData = tabData.map((item) =>
        //     item[uniqueId] === selectedOneRowForEdit[uniqueId]
        //         ? selectedOneRowForEdit
        //         : item
        // );


        // axios.patch(process.env.REACT_APP_TEST_API, selectedOneRowForEdit)

        try {
            let res = await axios.patch(process.env.REACT_APP_TEST_API + "/" + selectedOneRowForEdit[uniqueId], selectedOneRowForEdit)
            console.log(res);
        } catch (e) {
            console.log(e)
        }

        let tempUpdatedData = getDataFromDb()
        paginator(pageStartIndex, pageEndIndex, recordsPerPage, pageNo, tempUpdatedData)

        setSelectedOneRowForEdit(null);
    };

    const onUpdateCancel = () => {
        setSelectedOneRowForEdit(null);
    };

    const onDeleteConfirm = async (selectedRow) => {

        // console.log(selectedRow, tabData)

        // let tempRowData = tabData.filter(
        //     (row) => row[uniqueId] !== selectedRow[uniqueId]
        // );
        // setTabData(tempRowData);



        try {
            let res = await axios.delete(process.env.REACT_APP_TEST_API + "/" + selectedRow[uniqueId])
            console.log(res);
        } catch (e) {
            console.log(e)
        }


        let tempDataArr = getDataFromDb()

        let pagesLeftNow = Math.ceil(tempDataArr.length / recordsPerPage);
        let start = Math.max((pagesLeftNow - 1) * recordsPerPage, 0);
        let end = Math.min(
            pagesLeftNow * recordsPerPage - 1,
            tempDataArr.length - 1
        );

        let pageNumber = (pagesLeftNow < pageNo) ? pagesLeftNow : pageNo;


        paginator(start, end, recordsPerPage, pageNumber, tempDataArr);

        setSelectedOneRowForDelete(null);
    };

    const onDeleteCancel = () => {
        setSelectedOneRowForDelete(null);
    };

    const editRow = (selectedOneRow) => {
        // EditOneRowPopUp
        // call edit popup form here
        console.log(selectedOneRow);
        setCreateNewRecordFormOpen(false);
        setSelectedOneRowForEdit(selectedOneRow);
    };

    const deleteRow = (selectedOneRow) => {
        // Call confirmation popup here
        // DeleteOneRowPopUp
        setSelectedOneRowForDelete(selectedOneRow);
        console.log(selectedOneRow);
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
        // setPages(Math.ceil(data.length / noOfRecords));
        setPageNo(1);
        setDatainPage(tempDataArray);
    };

    const createNewRecord = () => {
        console.log(selectedOneRowForEdit);

        let inputFormData = {};

        columns.forEach((col) => {
            inputFormData[col.column] =
                col.formInputDetails && col.formInputDetails.defaultVal
                    ? col.formInputDetails.defaultVal
                    : "";
        });

        console.log(inputFormData);
        setSelectedOneRowForEdit({ ...inputFormData });
        setCreateNewRecordFormOpen(true);
    };

    const onAddNewRecord = async () => {

        // let tabDataTemp = [
        //     ...tabData,
        //     {
        //         ...selectedOneRowForEdit,
        //         [uniqueId]: parseInt(selectedOneRowForEdit[uniqueId]),
        //     },
        // ];

        console.log(selectedOneRowForEdit)

        try {
            let res = await axios.post(process.env.REACT_APP_TEST_API, selectedOneRowForEdit)
            console.log(res);
        } catch (e) {
            console.log(e)
        }


        let tempDataArr = getDataFromDb();

        // setTabData(tabDataTemp);

        paginator(pageStartIndex, pageEndIndex, recordsPerPage, pageNo, tempDataArr)


        setSelectedOneRowForEdit(null);
    };


    const onMulitSelectChange = (e, selectedRow, selectAllTogle) => {
        const checkedVal = e.target.checked;

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
        console.log(e.target.checked, multiSelectForDeleteList)
    }

    const deleteAllSelected = async () => {

        // const tempDataArr = tabData.filter(item => !multiSelectForDeleteList[item[uniqueId]])

        // console.log(multiSelectForDeleteList)
        try {
            let response = await axios.post(process.env.REACT_APP_TEST_API + "/delete-multiple", Object.keys(multiSelectForDeleteList))

            let tempDataArr = await getDataFromDb();
            paginator(pageStartIndex, pageEndIndex, recordsPerPage, pageNo, tempDataArr);
        }
        catch (error) {
            console.log(error);
        }


        // setTabData(tempDataArr);
        setMultiSelectForDeleteList({});
        setSelectedMultipleRowForDeletePopup(false)


    }


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

                        let response = await axios.post(process.env.REACT_APP_TEST_API + "/bulkData", rows);
                        console.log(response);

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


    const onJsonImport = async (e) => {

        const files = e.target.files;
        console.log(files.length)
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = async (e) => {
                const content = e.target.result;
                const newDataSetFromJSON = JSON.parse(content); // parse json 

                try {
                    let response = await axios.post(process.env.REACT_APP_TEST_API + "/bulkData", newDataSetFromJSON);

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

    return <div className={CrudieStyle.MainBody}>
        <div className={CrudieStyle.frame}>
            <>
                <button onClick={createNewRecord}>Create New</button>
                <button onClick={() => setSelectedMultipleRowForDeletePopup(true)}>Delete</button>
            </>

            <>
                <div>
                    <input id="excelImportBtn" type="file" onChange={onExcelImport} name="excel import" />
                    <label className="" htmlFor="excelImportBtn">Choose Excel</label>
                </div>
                <div>
                    <input type="file" id="jsonImportBtn" onChange={onJsonImport} />
                    <label className="" htmlFor="jsonImportBtn">Choose JSOn</label>

                </div>
                <div>
                    <button onClick={onExcelExport} className="btn">
                        Export Excel<i className="fa fa-download"></i>
                    </button>
                    <button onClick={onJsonExport} className="btn">
                        Export JSON
                    </button>
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
                                {col.column}{" "}
                                {
                                    col.column === sortedColumn && <span>
                                        {sortedAsc === -1 && <i>&#8595;</i>}
                                        {sortedAsc === 1 && <i >&#8593;</i>}
                                    </span>
                                }
                            </button>
                                : col.column


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