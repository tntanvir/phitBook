import Select from 'react-select';

const MultiSelect = ({ option, selectedOptions, setSelectedOptions, isDarkMode, color }) => {

    // console.log(isDarkMode);
    const handleChange = (selectedOptions) => {
        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setSelectedOptions(values);
    };

    // Define custom styles based on dark mode
    const customStyles = {
        container: (provided) => ({
            ...provided,
            width: '100%',
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: isDarkMode ? color : 'white',
            color: isDarkMode ? 'white' : 'black',
            borderColor: isDarkMode ? 'white' : 'black', // Always show border
            boxShadow: 'none', // Remove box-shadow
            '&:hover': {
                borderColor: isDarkMode ? 'white' : 'black', // Keep the border color on hover
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? (isDarkMode ? '#4a4b4c' : 'lightgray') : (isDarkMode ? color : 'white'),
            color: state.isSelected ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'white' : 'black'),
            '&:hover': {
                backgroundColor: isDarkMode ? '#4a4b4c' : 'lightgray',
                color: isDarkMode ? 'white' : 'black',
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: isDarkMode ? color : 'white',
            color: isDarkMode ? 'white' : 'black',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: isDarkMode ? '#9e9e9e' : 'lightgray',
        }),
    };

    return (
        <Select
            isMulti
            options={option}
            value={option.filter(opt => selectedOptions.includes(opt.value))}
            onChange={handleChange}
            styles={customStyles}
            placeholder="Category" // Set the placeholder text to "Category"
        />
    );
};

export default MultiSelect;
