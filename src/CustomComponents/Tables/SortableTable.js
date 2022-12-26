import { useEffect, useState } from "react";

const Sortable = ({ data, columns,sortableCols, tableHeader }) => {
  const [tabData, setTabData] = useState(data);
  const [sortedColumn , setSortedColumn] = useState("");
  const [sortedAsc , setSortedAsc] = useState(0);
  


  // useEffect(()=>{
  //   let tempAcendingColObj = {};
  //   column.forEach(col => {
  //     tempAcendingColObj[col.column] = 0;
  //   });

  //   setAscedntingIconArray({...tempAcendingColObj})
  // }, [])

  const sortColumn = (col, asc) => {

    if(asc){
      setSortedAsc(1);
    }
    else{
      setSortedAsc(-1);
    }

    if(sortedColumn !== col){
      
      setSortedAsc(1);
      setSortedColumn(col);
    }
    let sortedData = asc
      ? data.sort((row1, row2) =>(row1[col] > row2[col]) ? 1 : (row1[col] < row2[col]) ? -1 : 0)
      : data.sort((row1, row2) =>(row1[col] > row2[col]) ? -1 : (row1[col] < row2[col]) ? 1 : 0)


    setTabData([...sortedData]);
  };

  return (
    <div>
      {sortedAsc}
      {tableHeader && <h2 className="tableHeader">{tableHeader}</h2>}
      <table>
        <tr>
          {columns.map((col , index) => (
              <th>
              <button onClick={() => sortColumn(col.column, (sortedColumn === col.column && sortedAsc === 1) ? false : true)}>
              {col.column}{" "}
              {
              col.sortable && col.column === sortedColumn && <span>
                {sortedAsc === -1 && <i>&#8595;</i>}
                {sortedAsc === 1 && <i >&#8593;</i>}
              </span>
              }
              </button>
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
