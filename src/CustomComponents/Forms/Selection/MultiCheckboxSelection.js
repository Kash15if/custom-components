import { useState } from "react";

const MultiCheckboxSelection = () => {

    const [selectedValues, setSelectedValues] = useState();

    function handleSelectChange(event) {

        let val = event.target.value;
        console.log(val)
        let tempSV = selectedValues ? selectedValues.split(",") : [];

        console.log(tempSV)

        if (selectedValues && selectedValues.includes(val)) {
            console.log("contains")
            tempSV = tempSV.filter((item) => item !== val);

        }
        else {
            console.log("donot contains")
            tempSV.push(val);
        }

        console.log(tempSV)
        setSelectedValues(tempSV.join(','));
    }

    const options = ['Option 1', 'Option 2', 'Option 3'];

    return (<div>
        <label for="cars">Choose a car:</label>

        <select value={selectedValues} onChange={handleSelectChange}>

            <option value={""}>Select Options</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
        <p>You have selected: {selectedValues}</p>



    </div>);
}

export default MultiCheckboxSelection;