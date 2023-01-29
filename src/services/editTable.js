

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

    }
    else if (inputType === "date") {

    }
    else if (inputType === "datetime-local") {
        return <> <label for={col.column}>{col.column}</label>
            <input type="datetime-local" name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
        </>

    }

    else if (inputType === "number") {

    }
    else if (inputType === "password") {

    }
    else if (inputType === "select") {

    }
    else if (inputType === "radio") {

    }
    else if (inputType === "textarea") {

    }
    else {
        return (<>
            <label for={col.column}>{col.column}</label>
            <input name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
        </>)
    }
}

export { getInputBoxFromType }