

const getDefaultValFromInputType = () => {

}




const getInputBoxFromType = (col, selectedOneRowForEdit, editFormContentChange, index) => {



    let inputType = col.formInputDetails.inputType;
    console.log(inputType)
    if (inputType === "dropdown") {
        return (<>
            <label for={col.column}>{col.formInputDetails.label}</label>

            <select disabled={!((col.createOnce && !selectedOneRowForEdit[col.column].length) || col.editable)}
                name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]}
                onChange={editFormContentChange}>
                {
                    col.formInputDetails.data.map(item => <option value={item.value}>{item.label}</option>)
                }
            </select>
        </>)

    }
    else if (inputType === "checkbox") {
        return <>
            <input type="checkbox" name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
            <label disabled={!((col.createOnce && !selectedOneRowForEdit[col.column].length) || col.editable)} for={col.column}>{col.column}</label>
        </>
    }
    else if (inputType === "date") {
        return <> <label for={col.column}>{col.column}</label>
            <input disabled={!((col.createOnce && !selectedOneRowForEdit[col.column].length) || col.editable)} type="date" name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
        </>

    }
    else if (inputType === "datetime-local") {
        return <> <label for={col.column}>{col.column}</label>
            <input disabled={!((col.createOnce && !selectedOneRowForEdit[col.column].length) || col.editable)} type="datetime-local" name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
        </>

    }

    else if (inputType === "number") {
        return <> <label for={col.column}>{col.column}</label>
            <input disabled={!((col.createOnce && !selectedOneRowForEdit[col.column].length) || col.editable)} type="number" name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} min={col.formInputDetails.data.min} max={col.formInputDetails.data.max} />
        </>

    }
    else if (inputType === "password") {
        return <> <label for={col.column}>{col.column}</label>
            <input disabled={!((col.createOnce && !selectedOneRowForEdit[col.column].length) || col.editable)} type="password" name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
        </>

    }
    else if (inputType === "radio") {
        return <>
            <p>{col.formInputDetails.label}</p>{
                col.formInputDetails.data.map(item => <><label for={col.column}>
                    <input
                        type="radio"
                        value={item.value}
                        checked={selectedOneRowForEdit[col.column] === item.value}
                        onChange={editFormContentChange}
                        name={col.column} id={col.column}
                    />
                    {item.label}
                </label>
                </>)
            }

        </>
    }
    else if (inputType === "textarea") {
        return (<>
            <label for={col.column}>{col.column}</label>
            <input disabled={!((col.createOnce && !selectedOneRowForEdit[col.column].length) || col.editable)} type="textarea" name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
        </>)
    }
    else {
        return (<>
            <label for={col.column}>{col.column}</label>
            <input disabled={!((col.createOnce && !selectedOneRowForEdit[col.column].length) || col.editable)} name={col.column} id={col.column} value={selectedOneRowForEdit[col.column]} onChange={editFormContentChange} />
        </>)
    }
}

export { getInputBoxFromType }