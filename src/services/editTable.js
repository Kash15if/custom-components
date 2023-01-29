

const getInputBoxFromType = (col, selectedOneRowForEdit, editFormContentChange, index) => {

    let inputType = col.formInputDetails.inputType;
    console.log(inputType)
    if (inputType === "dropdown") {
        return (<>
            <label for={col.column}>{col.column}</label>

            <select name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange}>
                {
                    col.formInputDetails.data.map(item => <option value={item.value}>{item.label}</option>)
                }
            </select>
        </>)

    }
    else if (inputType === "checkbox") {
        return <>
            <input type="checkbox" name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
            <label for={col.column}>{col.column}</label>
        </>
    }
    else if (inputType === "date") {
        return <> <label for={col.column}>{col.column}</label>
            <input type="date" name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
        </>

    }
    else if (inputType === "datetime-local") {
        return <> <label for={col.column}>{col.column}</label>
            <input type="datetime-local" name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
        </>

    }

    else if (inputType === "number") {
        return <> <label for={col.column}>{col.column}</label>
            <input type="number" name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} min={col.formInputDetails.data.min} max={col.formInputDetails.data.max} />
        </>

    }
    else if (inputType === "password") {
        return <> <label for={col.column}>{col.column}</label>
            <input type="password" name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
        </>

    }
    else if (inputType === "radio") {
        return <>
            <p>{col.formInputDetails.radioLabel}</p>{
                col.formInputDetails.data.map(item => <><label for={col.column}>{col.column}</label>
                    <input type="password" name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
                </>)
            }

        </>
    }
    else if (inputType === "textarea") {
        return (<>
            <label for={col.column}>{col.column}</label>
            <input type="textarea" name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
        </>)
    }
    else {
        return (<>
            <label for={col.column}>{col.column}</label>
            <input name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
        </>)
    }
}

export { getInputBoxFromType }