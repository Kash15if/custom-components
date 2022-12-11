import "./App.css";

import Sortable from "./CustomComponents/Tables/SortableTable";
import Filterable from "./CustomComponents/Tables/FilterableTable";
import Editable from "./CustomComponents/Tables/Editable";
import SortFilter from "./CustomComponents/Tables/Sort-Filter";
import AllTogether from "./CustomComponents/Tables/Sort-Filter-Edit";

function App() {
  return (
    <div className="App">
      <SortFilter />
      <Filterable />
      <Editable />
      <SortFilter />
      <AllTogether />
    </div>
  );
}

export default App;
