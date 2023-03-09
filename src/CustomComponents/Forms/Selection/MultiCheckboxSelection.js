import { useState } from "react";

const MultiCheckboxSelection = () => {

    const [selectedValues, setSelectedValues] = useState([]);

    function handleSelectChange(event) {

        let val = event.target.value;
        console.log(val)
        let tempSV;

        if (selectedValues.includes(val)) {
            tempSV = selectedValues.filter((item) => item !== val);
        }
        else {
            tempSV = selectedValues;
            tempSV.push(val);
        }

        setSelectedValues([...tempSV]);
    }

    const options = ['Option 1', 'Option 2', 'Option 3'];

    return (<div>
        <label for="cars">Choose a car:</label>

        <select multiple value={selectedValues} onChange={handleSelectChange}>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
        <p>You have selected: {selectedValues.join(', ')}</p>



    </div>);
}

export default MultiCheckboxSelection;