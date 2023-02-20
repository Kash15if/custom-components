
import { useState } from 'react';
import { read, utils, writeFile } from 'xlsx';



const ImportExport = ({


    data,
    columns,
    filterableCols,
    sortableCols,
    tableHeader,
    recordsPerPageOption,
    defaultRecordPerPage,
    uniqueId,
}) => {


    const [tabData, setTabData] = useState(data);

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
                    setTabData([...tabData, ...rows])
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
        writeFile(workbook, tableHeader + "xlsx" || 'Report.xlsx');
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
                setTabData([...tabData, ...newDataSetFromJSON])
            }

            reader.readAsText(file);
        }
    }


    return (
        <div>

            <div>

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

            </div>
            <div>
                {tableHeader && <h2 className="tableHeader">{tableHeader}</h2>}
                <table>
                    <tr>
                        {columns.map((col, index) => (
                            <th>{col.column}
                            </th>
                        ))}
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>


                    {tabData &&
                        tabData.map((row) => {
                            return (
                                <tr>
                                    {columns.map((col) => (
                                        <td>{row[col.column]}</td>
                                    ))}
                                </tr>
                            );
                        })}
                </table>

            </div>
        </div>
    );
}

export default ImportExport;