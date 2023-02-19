
import { useState } from 'react';
import { read, utils, writeFile } from 'xlsx'; const ImportExport = ({


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

    const onFileChange = (e) => {

        const files = e.target.files;
        console.log(files.length)
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const wb = read(e.target.result);
                const sheets = wb.SheetNames;

                // console.log(sheets.length)
                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    // setMovies(rows)

                    setTabData([...tabData, ...rows])

                    // console.log(rows)
                }
            }


            reader.readAsArrayBuffer(file);
        }
        console.log("changed")
    }


    const handleExport = () => {
        const headings = [columns.map(oneCol => oneCol.column)];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, tabData, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Movie Report.xlsx');

    }

    const exportJsonData = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(tabData)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = tableHeader + ".json";

        link.click();
    };


    return (
        <div>

            <div>
                <input type="file" onChange={onFileChange} />
                <button onClick={handleExport} className="btn">
                    Export <i className="fa fa-download"></i>
                </button>
                <button onClick={exportJsonData} className="btn">
                    Export JSON
                </button>

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