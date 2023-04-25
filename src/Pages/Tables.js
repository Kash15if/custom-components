import Sortable from "../CustomComponents/Tables/Sortable/SortableTable";
import Filterable from "../CustomComponents/Tables/Filterable/FilterableTable";
import Editable from "../CustomComponents/Tables/Editable/Editable";
import CRUDIE from "../CustomComponents/Tables/CRUDIE/CRUDIE";
import SortFilterEdit from "../CustomComponents/Tables/Sort-Filter-Edit/Sort-Filter-Edit";
import Expandable from "../CustomComponents/Tables/ExpanedTable/ExpandedUsingRecursion";
import { useEffect, useState } from "react";
import axios from "axios";
import ExpandableWithComponent from "../CustomComponents/Tables/ExpanedTable/ExpandableWithComponent";

import { useLocation } from "react-router-dom";

import Popup from "../CustomComponents/PopUps/Popup";

import InnerCard from "../CustomComponents/Tables/ExpanedTable/InnerCard";

import TableStyle from "./TableStyle.module.css";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';


import beautify from 'js-beautify';



const Tables = ({ upDateData, data, expandableTableData, colmns }) => {
    // const [data , setData] = useState();
    const [dummyData, setDummyData] = useState();
    const [columns, setColumns] = useState();

    const [sortableParaeterStructurePopup, setSortableParaeterStructurePopup] =
        useState(false);
    const [sortableRealPropPopup, setSortableRealPropPopup] = useState(false);


    const [filterParaeterStructurePopup, setFilterParaeterStructurePopup] =
        useState(false);
    const [filterRealPropPopup, setFilterRealPropPopup] = useState(false);



    const [editableParaeterStructurePopup, setEditableParaeterStructurePopup] =
        useState(false);
    const [editableRealPropPopup, setEditableRealPropPopup] = useState(false);

    const [sortEditFilterRealPropPopup, setSortEditFilterRealPropPopup] =
        useState(false);

    const [expandableTableRealProp, setExpandableTableRealProp] = useState(false);
    const [expandableWithCompRealPropPopup, setExpandableWithCompRealPropPopup] =
        useState(false);

    const [crudieRealPropPopup, setCrudieRealPropPopup] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            let elem = document.getElementById(location.hash.slice(1));
            if (elem) {
                elem.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }, [location]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_TEST_API).then((response) => {
            const tempDataFromDB = response.data;
            setDummyData(tempDataFromDB);

            console.log(tempDataFromDB);

            // let tempCols = Object.keys(tempDataFromDB[0]).map((colName) =>
            // ({
            //     column: colName, sortable: true, editable: true, filterable: true,
            //     formInputDetails: { defaultVal: "abcd", inputType: "text", radioLabel: "Please select your favorite Web language:", data: [{ label: "xyz", value: "abc" }, { label: "uvw", value: "def" }], min: 0, max: 5 }
            //     // if inut type is dropdown then [{ label: "xyz", value: "abc" }]
            //     // if it it text then {placeholder: "xyz" , name: "name"}
            //     // if checkbox {label: "label" }
            //     // if date {min: "" , max: "" }
            //     // if int {min: "" , max: "" }
            //     // if textarea  {placeholder: "xyz" , name: "name" , lines: 2}

            // }));

            let tempCols = [
                {
                    column: "_id",
                    columnLabel: "Id",
                    sortable: true,
                    filterable: true,
                    editable: false,
                    createOnce: false,
                    formInputDetails: {
                        defaultVal: "",
                        inputType: "text",
                    },
                },
                {
                    column: "first_name",
                    columnLabel: "First Name",
                    sortable: true,
                    filterable: true,
                    editable: true,
                    createOnce: false,
                    formInputDetails: {
                        defaultVal: "",
                        inputType: "text",
                    },
                },
                {
                    column: "last_name",
                    columnLabel: "Last Name",
                    sortable: true,
                    filterable: true,
                    editable: true,
                    createOnce: false,
                    formInputDetails: {
                        defaultVal: "",
                        inputType: "text",
                    },
                },
                {
                    column: "email",
                    columnLabel: "Email",
                    sortable: true,
                    filterable: true,
                    editable: false,
                    createOnce: true,
                    formInputDetails: {
                        defaultVal: "",
                        inputType: "text",
                    },
                },
                {
                    column: "gender",
                    columnLabel: "Gender",
                    sortable: true,
                    filterable: true,
                    editable: true,
                    createOnce: false,
                    formInputDetails: {
                        defaultVal: "",
                        inputType: "radio",
                        label: "Please select your gender:",
                        data: [
                            { label: "Male", value: "Male" },
                            { label: "Female", value: "Female" },
                            { label: "Prefer Not to say", value: "NA" },
                        ],
                    },
                },
                {
                    column: "ip_address",
                    columnLabel: "Ip Address",
                    sortable: false,
                    filterable: true,
                    editable: true,
                    createOnce: false,
                    formInputDetails: {
                        defaultVal: "",
                        inputType: "text",
                    },
                },
                {
                    column: "country",
                    columnLabel: "Country",
                    sortable: true,
                    filterable: true,
                    editable: true,
                    createOnce: false,
                    formInputDetails: {
                        defaultVal: "Nepal",
                        inputType: "dropdown",
                        label: "Please select your Country:",
                        data: [
                            { label: "India", value: "India" },
                            { label: "Nepal", value: "Nepal" },
                            { label: "Sri Lanka", value: "Sri Lanka" },
                            { label: "Malaysia", value: "Malaysia" },
                            { label: "Japan", value: "Japan" },
                        ],
                    },
                },
            ];
            tempCols.innerColumns = [
                {
                    column: "current_address",
                    sortable: true,
                    filterable: true,
                },
                {
                    column: "permanent_address",
                    sortable: true,
                    filterable: true,
                },
            ];

            tempCols.innerColumns.innerColumns = [
                {
                    column: "current_address",
                    sortable: true,
                    filterable: true,
                },
                {
                    column: "permanent_address",
                    sortable: true,
                    filterable: true,
                },
            ];
            setColumns(tempCols);
        });
    }, []);

    return (
        <div>
            {/* ------------------------------------------------------------------Sortable------------------------------------------- */}
            <div id="sortable">
                {/* Sortable */}
                <h1 className={TableStyle.tableTitle}>Sortable Table</h1>


                {dummyData && columns && (
                    <Sortable
                        data={dummyData}
                        columns={columns}
                        tableHeader="Sortable Table"
                        recordsPerPageOption={[5, 10, 20]}
                        defaultRecordPerPage={5}
                    />
                )}

                <div className={TableStyle.propsButton}>
                    <button
                        className={TableStyle.Btn2}
                        onClick={() => setSortableRealPropPopup(true)}
                    >
                        Show Props
                    </button>

                </div>


                <Popup
                    visible={sortableRealPropPopup}
                    onClose={() => setSortableRealPropPopup(false)}
                >
                    <div>

                        <h2>Props for Sortable Table</h2>
                        {" "}
                        Props:-
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {`<Sortable
                        data={dummyData}
                        columns={columns}
                        tableHeader="Sortable Table"
                        recordsPerPageOption={[5, 10, 20]}
                        defaultRecordPerPage={5}
                    />`}
                        </SyntaxHighlighter>

                        data
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {beautify(JSON.stringify(dummyData), { indent_size: 2 })}
                        </SyntaxHighlighter>
                        columns
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {beautify(JSON.stringify(colmns), { indent_size: 2 })}
                        </SyntaxHighlighter>                    </div>
                </Popup>

                <h4>
                    Link to code:-{" "}
                    <a
                        className={TableStyle.LinkBtn}
                        href="https://github.com/Kash15if/custom-components/tree/main/src/CustomComponents/Tables/Sortable"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Sortable Table
                    </a>
                </h4>
            </div>

            {/* ------------------------------------------------------------------Sortable------------------------------------------- */}

            {/* ------------------------------------------------------------------Filterable------------------------------------------- */}
            <hr class={TableStyle.horizontalDivider}></hr>
            <div id="filterable">
                {/* Filterable */}
                <h1 className={TableStyle.tableTitle}>Filterable Table</h1>



                {dummyData && columns && (
                    <Filterable
                        data={dummyData}
                        columns={columns}
                        filterableCols={columns}
                        tableHeader="Filter Table"
                        recordsPerPageOption={[5, 10, 20]}
                        defaultRecordPerPage={5}
                    />
                )}

                <div className={TableStyle.propsButton}>
                    <button
                        className={TableStyle.Btn1}
                        onClick={() => setFilterParaeterStructurePopup(true)}
                    >
                        Show Props Strucutre
                    </button>
                    <button
                        className={TableStyle.Btn2}
                        onClick={() => setFilterRealPropPopup(true)}
                    >
                        Show Props
                    </button>
                </div>


                <Popup
                    visible={filterParaeterStructurePopup}
                    onClose={() => setFilterParaeterStructurePopup(false)}
                >
                    <div>
                        <h2>Parameters</h2>
                        <h4>Required Field</h4>
                        <ul>
                            <li>
                                data:- data for table should be in json format , array of object
                            </li>
                            <li>
                                columns :- array of objects having
                                <ol>
                                    <li>
                                        {
                                            "[{column: colName1, filterable: true},{column: colName2, filterable: true},...]"
                                        }
                                    </li>
                                </ol>
                            </li>

                            <li>
                                {" "}
                                recordsPerPageOption:- It is the options for no of records
                                present in a page. It will be an array of integers
                            </li>
                            <li>
                                defaultRecordPerPage: It is the no of records present in page by
                                default. It will be an integer
                            </li>
                        </ul>
                        <h4>Optional</h4>
                        <ul>
                            <li>
                                tableHeader:- It is the header of the table. It will be of type
                                String
                            </li>
                        </ul>
                    </div>
                </Popup>


                <Popup
                    visible={filterRealPropPopup}
                    onClose={() => setFilterRealPropPopup(false)}
                >
                    <div>
                        {" "}
                        <h2>Props for Filterable Table</h2>
                        Props:-
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {
                                `<Filterable
                                data={dummyData}
                                columns={columns}
                                filterableCols={columns}
                                tableHeader="Filter Table"
                                recordsPerPageOption={[5, 10, 20]}
                                defaultRecordPerPage={5}
                            />`
                            }
                        </SyntaxHighlighter>

                        data
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {beautify(JSON.stringify(dummyData), { indent_size: 2 })}
                        </SyntaxHighlighter>
                        columns
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {beautify(JSON.stringify(colmns), { indent_size: 2 })}
                        </SyntaxHighlighter>
                    </div>
                </Popup>

                <h4>
                    Link to code:-{" "}
                    <a
                        className={TableStyle.LinkBtn}
                        href="https://github.com/Kash15if/custom-components/tree/main/src/CustomComponents/Tables/Filterable"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Filterable Table
                    </a>
                </h4>
            </div>

            {/* ------------------------------------------------------------------Filterable------------------------------------------- */}

            {/* ------------------------------------------------------------------Editable------------------------------------------- */}

            <hr class={TableStyle.horizontalDivider}></hr>
            <div id="editable">
                <h1 className={TableStyle.tableTitle}>Editable Table</h1>


                {/* Edit */}
                {dummyData && columns && (
                    <Editable
                        data={dummyData}
                        columns={columns}
                        tableHeader="Editable Table"
                        uniqueId={"_id"}
                        recordsPerPageOption={[5, 10, 20]}
                        defaultRecordPerPage={5}
                        editApi={process.env.REACT_APP_TEST_API}
                        deleteOneApi={process.env.REACT_APP_TEST_API}
                    />
                )}

                <div className={TableStyle.propsButton}>
                    <button
                        className={TableStyle.Btn1}
                        onClick={() => setEditableParaeterStructurePopup(true)}
                    >
                        Show Props Strucutre
                    </button>
                    <button
                        className={TableStyle.Btn2}
                        onClick={() => setEditableRealPropPopup(true)}
                    >
                        Show Props
                    </button>
                </div>

                <Popup
                    visible={editableParaeterStructurePopup}
                    onClose={() => setEditableParaeterStructurePopup(false)}
                >
                    <div>
                        <ul>
                            <li>
                                data:- data for table should be in json format , array of object
                            </li>
                            <li>
                                {" "}
                                Property:-
                                <ul>
                                    <li>column:- It is the column name in the db</li>
                                    <li>column:- It is the column alias name</li>
                                    <li>
                                        editable:-True, if this column is editable. Also we have to
                                        justify each column property in formInputDetails
                                        <ol>
                                            Form Input details:-
                                            <li>
                                                input type:- Type of the input. i.e. text , dropdown ,
                                                radio, number, textarea,checkbox,datetime, password{" "}
                                            </li>
                                            <li>
                                                If it is text then it doesnot require any data or label
                                                but if it is dropdown or radio then it require parameter
                                                data and label
                                            </li>
                                            <li>
                                                data:- data is array of objects containing 2 parameters
                                                label and value
                                            </li>
                                            <li>label : Label for radio and dropdown</li>
                                            <li>date {`{min: "" , max: "" }`}</li>
                                            <li>
                                                textarea:-{" "}
                                                {`{placeholder: "xyz" , name: "name" , lines: 2}`}
                                            </li>
                                        </ol>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Complete structure :- array of objects having
                                <ol>
                                    <li>
                                        <pre>
                                            {JSON.stringify(
                                                [
                                                    {
                                                        column: "colName1",
                                                        columnLabel: "Column Label 1",
                                                        editable: true,
                                                        formInputDetails: {
                                                            defaultVal: "",
                                                            inputType: "dropdown",
                                                            label: "Please select from dropdown:",
                                                            data: [
                                                                { label: "X", value: "A" },
                                                                { label: "Y", value: "B" },
                                                                { label: "Z", value: "C" },
                                                            ],
                                                        },
                                                    },
                                                    {
                                                        column: "colName2",
                                                        columnLabel: "Column Label 1",
                                                        editable: true,
                                                        formInputDetails: {
                                                            defaultVal: "",
                                                            inputType: "radio",
                                                            label: "Please select one radio button:",
                                                            data: [
                                                                { label: "X", value: "A" },
                                                                { label: "Y", value: "B" },
                                                                { label: "Z", value: "C" },
                                                            ],
                                                        },
                                                    },
                                                    {
                                                        column: "colName2",
                                                        columnLabel: "Column Label 1",
                                                        editable: true,
                                                        createOnce: false,
                                                        formInputDetails: {
                                                            defaultVal: "",
                                                            inputType: "text",
                                                        },
                                                    },
                                                ],
                                                null,
                                                2
                                            )}
                                        </pre>
                                    </li>
                                </ol>
                            </li>

                            <li>
                                {" "}
                                recordsPerPageOption:- It is the options for no of records
                                present in a page. It will be an array of integers
                            </li>
                            <li>
                                defaultRecordPerPage: It is the no of records present in page by
                                default. It will be an integer
                            </li>
                        </ul>
                        <h4>Optional</h4>
                        <ul>
                            <li>
                                tableHeader:- It is the header of the table. It will be of type
                                String
                            </li>
                        </ul>
                    </div>
                </Popup>


                <Popup
                    visible={editableRealPropPopup}
                    onClose={() => setEditableRealPropPopup(false)}
                >
                    <div>


                        {" "}
                        <h2>Props for Filterable Table</h2>
                        Props:-
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {
                                `<Editable data={data}
                                columns={columns}
                                tableHeader="Editable Table"
                                uniqueId={"_id"}
                                recordsPerPageOption={[5, 10, 20]}
                                defaultRecordPerPage={5}
                                editApi={process.env.REACT_APP_TEST_API}
                                deleteOneApi={process.env.REACT_APP_TEST_API}
                        />`
                            }
                        </SyntaxHighlighter>

                        data
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {beautify(JSON.stringify(dummyData), { indent_size: 2 })}
                        </SyntaxHighlighter>
                        columns
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {beautify(JSON.stringify(colmns), { indent_size: 2 })}
                        </SyntaxHighlighter>

                    </div>
                </Popup>


                <h4>
                    Link to code:-{" "}
                    <a
                        className={TableStyle.LinkBtn}
                        href="https://github.com/Kash15if/custom-components/tree/main/src/CustomComponents/Tables/Editable"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Editable Table
                    </a>
                </h4>
            </div>

            {/* ------------------------------------------------------------------Editable------------------------------------------- */}

            {/* ------------------------------------------------------------------SortFilterEdit------------------------------------------- */}
            {/* Sort Filter and Edit */}

            <hr class={TableStyle.horizontalDivider}></hr>
            <div id="sortEditFilter">
                <h1 className={TableStyle.tableTitle}>Sort Filter and Edit together Table</h1>


                {dummyData && columns && (
                    <SortFilterEdit
                        data={data}
                        columns={columns}
                        tableHeader="Sort Edit and Filter"
                        recordsPerPageOption={[5, 10, 20]}
                        defaultRecordPerPage={5}
                        uniqueId="_id"
                        getDataApi={process.env.REACT_APP_TEST_API}
                        editApi={process.env.REACT_APP_TEST_API}
                        deleteOneApi={process.env.REACT_APP_TEST_API}
                    />
                )}


                <div className={TableStyle.propsButton}>
                    <button
                        className={TableStyle.Btn2}
                        onClick={() => setSortEditFilterRealPropPopup(true)}
                    >
                        Show Props
                    </button></div>
                <Popup
                    visible={sortEditFilterRealPropPopup}
                    onClose={() => setSortEditFilterRealPropPopup(false)}
                >
                    <div>


                        {" "}
                        <h2>Props for Filterable Table</h2>
                        Props:-
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {
                                `<SortFilterEdit
                                data={data}
                                columns={columns}
                                tableHeader="Sort Edit and Filter"
                                recordsPerPageOption={[5, 10, 20]}
                                defaultRecordPerPage={5}
                                uniqueId="_id"
                                getDataApi={process.env.REACT_APP_TEST_API}
                                editApi={process.env.REACT_APP_TEST_API}
                                deleteOneApi={process.env.REACT_APP_TEST_API}
                            />`
                            }
                        </SyntaxHighlighter>

                        data
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {beautify(JSON.stringify(dummyData), { indent_size: 2 })}
                        </SyntaxHighlighter>
                        columns
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {beautify(JSON.stringify(colmns), { indent_size: 2 })}
                        </SyntaxHighlighter>



                    </div>
                </Popup>

                <h4>
                    Link to code:-{" "}
                    <a
                        className={TableStyle.LinkBtn}
                        href="https://github.com/Kash15if/custom-components/tree/main/src/CustomComponents/Tables/Sort-Filter-Edit"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Sort Edit Filter Table
                    </a>
                </h4>
            </div>

            {/* ---------------------------------------------------------------SortFilterEdit------------------------------------------- */}



            {/* --------------------------------------------------------------- Expandable table----------------------------------------- */}
            <hr class={TableStyle.horizontalDivider}></hr>
            <div id="recursiveExpandable">

                <h1 className={TableStyle.tableTitle}>Expandable Table</h1>

                {/* Expandable table */}
                {dummyData && columns && (
                    <Expandable
                        data={expandableTableData}
                        columns={columns}
                        tableHeader="Recursive Expandable Table"
                        recordsPerPageOption={[5, 10, 20]}
                        defaultRecordPerPage={5}
                        uniqueId="_id"
                    />
                )}


                <div className={TableStyle.propsButton}>
                    <button
                        className={TableStyle.Btn2}
                        onClick={() => setExpandableTableRealProp(true)}
                    >
                        Show Props
                    </button></div>


                <Popup
                    visible={expandableTableRealProp}
                    onClose={() => setExpandableTableRealProp(false)}
                >
                    <div>

                        {" "}
                        <h2>Props for Expandable Table</h2>
                        Props:-
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {
                                ` <Expandable
                                data={expandableTableData}
                                columns={columns}
                                tableHeader="Recursive Expandable Table"
                                recordsPerPageOption={[5, 10, 20]}
                                defaultRecordPerPage={5}
                                uniqueId="_id"
                            />`
                            }
                        </SyntaxHighlighter>

                        data
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {beautify(JSON.stringify(expandableTableData), { indent_size: 2 })}
                        </SyntaxHighlighter>
                        columns
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {beautify(JSON.stringify(colmns), { indent_size: 2 })}
                        </SyntaxHighlighter>

                    </div>
                </Popup>


                <h4>
                    Link to code:-{" "}
                    <a
                        className={TableStyle.LinkBtn}
                        href="https://github.com/Kash15if/custom-components/tree/main/src/CustomComponents/Tables/ExpanedTable"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Expanable Table
                    </a>
                </h4>
            </div>

            {/* ------------------------------------------------------------- Expandable table ------------------------------------------- */}

            {/* ------------------------------------------------------------------ExpandableWithComponent------------------------------------------- */}
            <hr class={TableStyle.horizontalDivider}></hr>
            <div id="expandable">

                <h1 className={TableStyle.tableTitle}>Expandable Table With component</h1>


                {expandableTableData && colmns && (
                    <ExpandableWithComponent
                        data={expandableTableData}
                        columns={colmns}
                        filterableCols={colmns}
                        sortableCols={colmns}
                        tableHeader="Expandable Table with components"
                        recordsPerPageOption={[5, 10, 20]}
                        defaultRecordPerPage={5}
                        uniqueId="id"
                        InnerComponent={InnerCard}
                    ></ExpandableWithComponent>
                )}


                <div className={TableStyle.propsButton}>
                    <button
                        className={TableStyle.Btn2}
                        onClick={() => setExpandableWithCompRealPropPopup(true)}
                    >
                        Show Props
                    </button>
                </div>



                <Popup
                    visible={expandableWithCompRealPropPopup}
                    onClose={() => setExpandableWithCompRealPropPopup(false)}
                >
                    <div>
                        {" "}
                        <h2>Props for Expandable With Component Table</h2>
                        Props:-
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {
                                ` <ExpandableWithComponent data={expandableTableData}
                                columns={colmns}
                                filterableCols={colmns}
                                sortableCols={colmns}
                                tableHeader="Expandable Table with components"
                                recordsPerPageOption={[5, 10, 20]}
                                defaultRecordPerPage={5}
                                uniqueId="id"
                                InnerComponent={InnerCard}
                            >
                            </ExpandableWithComponent>`
                            }
                        </SyntaxHighlighter>

                        data
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {beautify(JSON.stringify(expandableTableData), { indent_size: 2 })}
                        </SyntaxHighlighter>
                        columns
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {beautify(JSON.stringify(colmns), { indent_size: 2 })}
                        </SyntaxHighlighter>

                    </div>
                </Popup>

                <h4>
                    Link to code:-{" "}
                    <a
                        className={TableStyle.LinkBtn}
                        href="https://github.com/Kash15if/custom-components/tree/main/src/CustomComponents/Tables/ExpanedTable"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Expandable With Component Table
                    </a>
                </h4>
            </div>

            {/* ------------------------------------------------------------------ExpandableWithComponent------------------------------------------- */}

            {/* ------------------------------------------------------------------CRDUIE------------------------------------------- */}
            <hr class={TableStyle.horizontalDivider}></hr>

            <div id="crudie">

                <h1 className={TableStyle.tableTitle}>CRUD Import Export Table</h1>
                {/* Crud and Import Export */}
                {columns && (
                    <CRUDIE
                        data={data}
                        columns={columns}
                        tableHeader="CRUD Import Export Table"
                        recordsPerPageOption={[5, 10, 20]}
                        defaultRecordPerPage={5}
                        uniqueId="_id"
                        excelImport={true}
                        excelExport={true}
                        jsonImport={true}
                        jsonExport={true}
                        getDataApi={process.env.REACT_APP_TEST_API}
                        createApi={process.env.REACT_APP_TEST_API}
                        uploadBulkApi={process.env.REACT_APP_TEST_API + "/bulkData"}
                        editApi={process.env.REACT_APP_TEST_API}
                        deleteOneApi={process.env.REACT_APP_TEST_API}
                        deleteMultipleApi={
                            process.env.REACT_APP_TEST_API + "/delete-multiple"
                        }
                    />
                )}


                <div className={TableStyle.propsButton}>
                    <button
                        className={TableStyle.Btn2}
                        onClick={() => setCrudieRealPropPopup(true)}
                    >
                        Show Props
                    </button>
                </div>


                <Popup
                    visible={crudieRealPropPopup}
                    onClose={() => setCrudieRealPropPopup(false)}
                >
                    <div>

                        <h2>Props for CRUD Import Export Table</h2>
                        Props:-
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {
                                ` <CRUDIE
                                data={data}
                                columns={columns}
                                tableHeader="CRUD Import Export Table"
                                recordsPerPageOption={[5, 10, 20]}
                                defaultRecordPerPage={5}
                                uniqueId="_id"
                                excelImport={true}
                                excelExport={true}
                                jsonImport={true}
                                jsonExport={true}
                                getDataApi={process.env.REACT_APP_TEST_API}
                                createApi={process.env.REACT_APP_TEST_API}
                                uploadBulkApi={process.env.REACT_APP_TEST_API + "/bulkData"}
                                editApi={process.env.REACT_APP_TEST_API}
                                deleteOneApi={process.env.REACT_APP_TEST_API}
                                deleteMultipleApi={
                                    process.env.REACT_APP_TEST_API + "/delete-multiple"
                                }
                            /> `
                            }
                        </SyntaxHighlighter>

                        data
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {beautify(JSON.stringify(expandableTableData), { indent_size: 2 })}
                        </SyntaxHighlighter>
                        columns
                        <SyntaxHighlighter language="javascript" style={dark}>
                            {beautify(JSON.stringify(colmns), { indent_size: 2 })}
                        </SyntaxHighlighter>

                    </div>
                </Popup>


                <h4>
                    Link to code:-{" "}
                    <a
                        className={TableStyle.LinkBtn}
                        href="https://github.com/Kash15if/custom-components/tree/main/src/CustomComponents/Tables/CRUDIE"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        CRUD Import Export (Excel and JSON) Table
                    </a>
                </h4>
                <h4>
                    Dependencies :-{" "}
                    <a
                        className={TableStyle.LinkBtn}
                        href="https://www.npmjs.com/package/axios"
                    >
                        Axios
                    </a>{" "}
                    and{" "}
                    <a
                        className={TableStyle.LinkBtn}
                        href="https://www.npmjs.com/package/xlsx"
                    >
                        xlsx
                    </a>
                </h4>
            </div>

            {/* ------------------------------------------------------------------CRDUIE------------------------------------------- */}

            {/* ------------------------------------------------------------------ Multi Header Table Table------------------------------------------- */}

            {/* Multi Header Table Table */}

            {/* ------------------------------------------------------------------ Multi Header Table Table------------------------------------------- */}

            <h2>
                Data Source:-{" "}
                <a
                    className={TableStyle.LinkBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.mockaroo.com/"
                >
                    Mockaroo
                </a>
            </h2>
        </div>
    );
};

export default Tables;
