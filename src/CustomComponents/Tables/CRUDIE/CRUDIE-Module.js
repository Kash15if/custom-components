import { useState, useEffect } from "react";

import { read, utils, writeFile } from 'xlsx';

import { getInputBoxFromType } from "../../../services/editTable";

const CRUDIE = ({
    data,
    columns,
    filterableCols,
    sortableCols,
    tableHeader,
    recordsPerPageOption,
    defaultRecordPerPage,
    uniqueId,
    upDateData,
    sortable,
    filterable,
    editable,
    jsonImport,
    excelImport,
    jsonExport,
    excelExport,
    canAddNew,
    deleteSingle,//returns updateDataSet
    deleteMultile,
    updateOne,
    addOne,
    importFromJson,
    ImportFromExcel,
    createOne
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

    const [pages, setPages] = useState(Math.ceil(data.length / recordsPerPage));
    const [pageNo, setPageNo] = useState(1);
    const [pageStartIndex, setPageStartIndex] = useState(0);
    const [pageEndIndex, setPageEndIndex] = useState(recordsPerPage - 1);
    const [datainPage, setDatainPage] = useState(
        data.filter((item, index) => index < recordsPerPage)
    );
    const [selectedOneRowForEdit, setSelectedOneRowForEdit] = useState();
    const [selectedOneRowForDelete, setSelectedOneRowForDelete] = useState();
    const [createNewRecordFormOpen, setCreateNewRecordFormOpen] = useState(false);
    const [multiSelectForDeleteList, setMultiSelectForDeleteList] = useState({})

    useEffect(() => {
        let filteredTempObj = {};
        filterableCols.forEach((elemt) => {
            if (elemt.filterable) {
                filteredTempObj[elemt.column] = "";
            }
        });

        const tempData = data.map(itemRow => ({ ...itemRow, selectedCurrentRow: false }))
        setTabData(tempData);
        setValuesToBeFiltered(filteredTempObj);

        paginator(null, null, recordsPerPage, 1, tempData);


    }, []);


    const changeFilterableInputs = (e) => {
        const { name, value } = e.target;

        let tempFilteredStringObject = { ...valuesToBeFiltered, [name]: value };

        // filterLogic to be implemented here
        let filteredData = data.filter((itemRow) => {
            let dataPresentInRow = true;
            columns.forEach((cols, index) => {
                let columnName = cols.column;

                let columnData = itemRow[columnName].toString();

                if (
                    cols.filterable &&
                    tempFilteredStringObject[columnName] !== "" &&
                    !columnData.includes(tempFilteredStringObject[columnName])
                ) {
                    console.log(tempFilteredStringObject[columnName], columnData);
                    dataPresentInRow = false;
                }
            });

            return dataPresentInRow;
        });

        setTabData([...filteredData]);
        setValuesToBeFiltered(tempFilteredStringObject);

        paginator(null, null, recordsPerPage, 1, filteredData)

    };


    const editFormContentChange = (e) => {
        const { name, value } = e.target;
        setSelectedOneRowForEdit({ ...selectedOneRowForEdit, [name]: value });
    };

    const onUpdateConfirm = () => {
        let tempUpdatedData = tabData.map((item) =>
            item[uniqueId] === selectedOneRowForEdit[uniqueId]
                ? selectedOneRowForEdit
                : item
        );

        paginator(pageStartIndex, pageEndIndex, recordsPerPage, pageNo, tempUpdatedData)
        setSelectedOneRowForEdit(null);
    };

    const onUpdateCancel = () => {
        setSelectedOneRowForEdit(null);
    };

    const onDeleteConfirm = (selectedRow) => {
        // console.log(selectedRow, tabData)
        let tempRowData = tabData.filter(
            (row) => row[uniqueId] !== selectedRow[uniqueId]
        );
        setTabData(tempRowData);


        let pagesLeftNow = Math.ceil(tempRowData.length / recordsPerPage);
        let start = Math.max((pagesLeftNow - 1) * recordsPerPage, 0);
        let end = Math.min(
            pagesLeftNow * recordsPerPage - 1,
            tempRowData.length - 1
        );

        let pageNumber = (pagesLeftNow < pageNo) ? pagesLeftNow : pageNo;


        paginator(start, end, recordsPerPage, pageNumber, tempRowData);

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

    const onAddNewRecord = () => {

        let tabDataTemp = [
            ...tabData,
            {
                ...selectedOneRowForEdit,
                [uniqueId]: parseInt(selectedOneRowForEdit[uniqueId]),
            },
        ];

        setTabData(tabDataTemp);

        paginator(pageStartIndex, pageEndIndex, recordsPerPage, pageNo, tabDataTemp)

    };


    const onMulitSelectChange = (e, selectedRow) => {
        const checkedVal = e.target.checked;

        let rowId = selectedRow[uniqueId]
        if (multiSelectForDeleteList[rowId]) {
            let tempMultiDeleteList = multiSelectForDeleteList;
            delete multiSelectForDeleteList[rowId];
            setMultiSelectForDeleteList(tempMultiDeleteList)
        }
        else {
            setMultiSelectForDeleteList({ ...multiSelectForDeleteList, [rowId]: true })
        }
        console.log(e.target.checked, multiSelectForDeleteList)
    }

    const deleteAllSelected = () => {

        const tempDataArr = tabData.filter(item => !multiSelectForDeleteList[item[uniqueId]])

        setTabData(tempDataArr);
        setMultiSelectForDeleteList({});

        paginator(pageStartIndex, pageEndIndex, recordsPerPage, pageNo, tempDataArr);

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
            reader.onload = (e) => {
                const workbook = read(e.target.result);
                const sheets = workbook.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(workbook.Sheets[sheets[0]]);
                    let tempOpertedData = [...tabData, ...rows];
                    paginator(null, null, recordsPerPage, null, tempOpertedData)
                    setTabData(tempOpertedData);
                    upDateData(tempOpertedData);
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


    const onJsonImport = (e) => {

        const files = e.target.files;
        console.log(files.length)
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const newDataSetFromJSON = JSON.parse(content); // parse json 
                let tempOpertedData = [...tabData, ...newDataSetFromJSON];
                paginator(null, null, recordsPerPage, null, tempOpertedData)
                setTabData(tempOpertedData);
                upDateData(tempOpertedData);
            }

            reader.readAsText(file);
        }
    }

    return <div>
        <>
            <button onClick={createNewRecord}>Create New</button>
            <button onClick={deleteAllSelected}>Delete</button>
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
                <th></th>
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
                            <td><input type="checkbox" id={"checkBox_" + row[uniqueId]} name="selectCheckBox" checked={multiSelectForDeleteList[tempUniqueId] ? true : false} onChange={(e) => onMulitSelectChange(e, row)} /></td>
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
        ;
}

export default CRUDIE;