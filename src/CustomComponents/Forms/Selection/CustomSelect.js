import React, { useState, useRef, useEffect } from "react";

const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
];

const MultiSelectDropdown = () => {
    const [open, setOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dropdownRef = useRef(null);

    const handleOptionChange = (optionValue) => {
        if (selectedOptions.includes(optionValue)) {
            setSelectedOptions(selectedOptions.filter((value) => value !== optionValue));
        } else {
            setSelectedOptions([...selectedOptions, optionValue]);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    const toggleDropdown = () => {
        setOpen(!open);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef}>
            <div className="dropdown-toggle" onClick={toggleDropdown}>
                Select options
            </div>
            {open && (
                <div >
                    {options.map((option) => (
                        <label key={option.value}>
                            <input
                                type="checkbox"
                                value={option.value}
                                checked={selectedOptions.includes(option.value)}
                                onChange={() => handleOptionChange(option.value)}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
            <div>
                Selected options: {selectedOptions.map((option) => options.find((o) => o.value === option).label).join(", ")}
            </div>
        </div>
    );
};

export default MultiSelectDropdown;
