

import Select from 'react-select';

const MultiSelect = ({ option, selectedOptions, setSelectedOptions }) => {
    const handleChange = (selectedOptions) => {
        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setSelectedOptions(values);
    };

    return (
        <Select
            isMulti
            options={option}
            value={option.filter(option => selectedOptions.includes(option.value))}
            onChange={handleChange}
        />
    );
};

export default MultiSelect;


