import Sortable from "../CustomComponents/Tables/Sortable/SortableTable"
import Filterable from "../CustomComponents/Tables/Filterable/FilterableTable"
import CRUDIE from "../CustomComponents/Tables/CRUDIE/CRUDIE";


const Tables = ({ dummyData, columns, upDateData, data }) => {
    return (<div>

        {/* Sortable */}

        <Sortable
            data={dummyData}
            columns={columns}
            tableHeader="Sortable Table"
            recordsPerPageOption={[5, 10, 20]}
            defaultRecordPerPage={5}
        />


        {/* Filterable */}
        {dummyData && columns && (
            <Filterable data={dummyData}
                columns={columns}
                filterableCols={columns}
                tableHeader="Filter Table"
                recordsPerPageOption={[5, 10, 20]}
                defaultRecordPerPage={5}
            />)}


        {/* Sort Filter */}

        {/* Sort Filter and Edit */}

        {/* Crud and Import Export */}
        {dummyData && columns && (
            <CRUDIE
                data={data}
                columns={columns}
                filterableCols={columns}
                sortableCols={columns}
                tableHeader="CRUD Import Export Table"
                recordsPerPageOption={[5, 10, 20]}
                defaultRecordPerPage={5}
                uniqueId="id"
                upDateData={upDateData}
            />
        )}


        {/* Expandable Table */}


    </div>);
}

export default Tables;