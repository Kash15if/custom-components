import { useState } from "react";

const Sortable = ({ data, columns, tableHeader }) => {
  const [tabData, setTabData] = useState(data);

  const sortColumn = (col, asc) => {
    let sortedData = asc
      ? tabData.sort((row1, row2) => row1[col] - row2[col])
      : tabData.sort((row2, row1) => row1[col] - row2[col]);

    console.log(sortedData);

    setTabData([...sortedData]);
  };

  return (
    <div>
      {tableHeader && <h2 className="tableHeader">{tableHeader}</h2>}
      <table>
        <tr>
          {columns.map((col) => (
            <th>
              {col}{" "}
              <span>
                <button onClick={() => sortColumn(col, false)}>sort</button>
              </span>
            </th>
          ))}
        </tr>

        {tabData &&
          tabData.map((row) => {
            return (
              <tr>
                {" "}
                {columns.map((col) => (
                  <td>{row[col]}</td>
                ))}{" "}
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default Sortable;
