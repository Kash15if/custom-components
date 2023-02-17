
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


    const [tabData, setTabData] = useState();

    const onFileChange = (e) => {

        const files = e.target.files;
        console.log(files.length)
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const wb = read(e.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    // setMovies(rows)

                    setTabData([...tabData, ...rows])

                    console.log(rows)
                }
            }


            reader.readAsArrayBuffer(file);
        }
        console.log("changed")
    }


    const handleExport = () => {
        const headings = [[
            'Movie',
            'Category',
            'Director',
            'Rating'
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Movie Report.xlsx');
    }

    return (
        <div>

            <div>
                <input type="file" onChange={onFileChange} />
                <button onClick={handleExport} className="btn btn-primary float-right">
                    Export <i className="fa fa-download"></i>
                </button>
            </div>

            <div>
                {tableHeader && <h2 className="tableHeader">{tableHeader}</h2>}
                <table>
                    <tr>
                        <th></th>
                        {columns.map((col, index) => (
                            <th>{col.column}
                            </th>
                        ))}
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>


                    {data &&
                        data.map((row) => {
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