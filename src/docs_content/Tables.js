
const sortableStructurePopupCOntent = () => `<ul>
<li>data:- data for table should be in json format , array of object</li>
<li> Property:-
    <ul>
        <li>column:- It is the column name in the db</li>
        <li>column:- It is the column alias name</li>
        <li>editable:-True, if this column is editable. Also we have to justify each column property in  formInputDetails
            <ol>Form Input details:-
                <li>input type:- Type of the input. i.e. text , dropdown , radio, number, textarea,checkbox,datetime, password </li>
                <li>If it is text then it doesnot require any data or label but if it is dropdown or radio then it require parameter data and label</li>
                <li>data:- data is array of objects containing 2 parameters label and value</li>
                <li>label : Label for radio and dropdown</li>
                {/* if inut type is dropdown then [{ label: "xyz", value: "abc" }] 
if it it text then {placeholder: "xyz" , name: "name"}
if checkbox {label: "label" }
if date {min: "" , max: "" }
if int {min: "" , max: "" }
if textarea  {placeholder: "xyz" , name: "name" , lines: 2} */}

            </ol>
        </li>
    </ul>
</li>
<li>Complete structure :- array of objects having
    <ol>
        <li><pre>{JSON.stringify([
            {
                column: "colName1",
                columnLabel: "Column Label 1",
                editable: true,
                formInputDetails: {
                    defaultVal: "",
                    inputType: "dropdown",
                    label: "Please select from dropdown:",
                    data: [{ label: "X", value: "A" },
                    { label: "Y", value: "B" },
                    { label: "Z", value: "C" }
                    ]
                }
            },
            {
                column: "colName2",
                columnLabel: "Column Label 1",
                editable: true,
                formInputDetails: {
                    defaultVal: "",
                    inputType: "radio",
                    label: "Please select one radio button:",
                    data: [{ label: "X", value: "A" },
                    { label: "Y", value: "B" },
                    { label: "Z", value: "C" }
                    ]
                }
            }, {
                column: "colName2",
                columnLabel: "Column Label 1",
                editable: true,
                createOnce: false,
                formInputDetails: {
                    defaultVal: "",
                    inputType: "text"
                }
            },
        ], null, 2)}</pre>

        </li>
    </ol>
</li>

<li> recordsPerPageOption:- It is the options for no of records present in a page. It will be an array of integers</li>
<li>defaultRecordPerPage: It is the no of records present in page by default. It will be an integer</li>
</ul>
<h4>Optional</h4>
<ul>
    <li>tableHeader:- It is the header of the table. It will be of type String</li>
</ul>`

const sortableTableActualPropContent = (dummyData, columns, tableHeader, uniqueId, recordsPerPageOption, defaultRecordPerPage, editApi, deleteOneApi) => ` data
<ul>
    <li><pre>{JSON.stringify(${dummyData})}</pre></li>
</ul>
columns
<ul>
    <li><pre>{JSON.stringify(${columns})}</pre></li>
</ul>tableHeader
<ul>
    <li><pre>{JSON.stringify(${tableHeader})}</pre></li>
</ul>uniqueId
<ul>
    <li><pre>{JSON.stringify(${uniqueId})}</pre></li>
</ul>recordsPerPageOption
<ul>
    <li><pre>{JSON.stringify(${recordsPerPageOption})}</pre></li>
</ul>defaultRecordPerPage
<ul>
    <li><pre>{JSON.stringify(${defaultRecordPerPage})}</pre></li>
</ul>editApi
<ul>
    <li><pre>{JSON.stringify(${editApi}}</pre></li>
</ul>
<ul>deleteOneApi
    <li><pre>{JSON.stringify(${deleteOneApi})}</pre></li>
</ul>`

module.exports = { sortableStructurePopupCOntent, sortableTableActualPropContent };