import { useEffect, useState } from "react";

const Sortable = ({ data, columns,sortableCols, tableHeader }) => {
  const [tabData, setTabData] = useState(data);
  const [ascedntingIconArray , setAscedntingIconArray] = useState();


  useEffect(()=>{
    // let tempAcendingColArray = columns.map()
  }, [])

  const sortColumn = (col, asc) => {
    let sortedData = asc
      ? tabData.sort((row1, row2) =>(row1[col] > row2[col]) ? 1 : (row1[col] < row2[col]) ? -1 : 0)
      : tabData.sort((row1, row2) =>(row1[col] > row2[col]) ? -1 : (row1[col] < row2[col]) ? 1 : 0)

    console.log(sortedData);

    setTabData([...sortedData]);
  };

  return (
    <div>
      {tableHeader && <h2 className="tableHeader">{tableHeader}</h2>}
      <table>
        <tr>
          {columns.map((col , index) => (
            <th>
              {col.column}{" "}
              <span>
                <button onClick={() => sortColumn(col.column, true)}>&#8593;</button>
                <button onClick={() => sortColumn(col.column, false)}>&#8595;</button>
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
                  <td>{row[col.column]}</td>
                ))}{" "}
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default Sortable;
