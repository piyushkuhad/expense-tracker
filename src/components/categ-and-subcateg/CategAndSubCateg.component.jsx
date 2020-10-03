import React, { useState, useCallback, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

const CategAndSubCateg = (props) => {
  const { update, selected, onChange } = props;

  const [value, setValue] = useState(update ? selected : {});
  const [options, setOptions] = useState(props.selectData);

  const handleChange = useCallback((inputValue) => setValue(inputValue), []);

  const handleCreate = useCallback(
    (inputValue) => {
      const newValue = { value: inputValue.toLowerCase(), label: inputValue };
      setOptions([...options, newValue]);
      setValue(newValue);
    },
    [options]
  );

  useEffect(() => {
    //console.log(value);
    onChange(value);
  }, [onChange, value]);

  return (
    <div className="App">
      <CreatableSelect
        isClearable
        value={value}
        options={options}
        onChange={handleChange}
        //defaultMenuIsOpen
        onCreateOption={handleCreate}
        //defaultValue={selected}
      />
    </div>
  );
};

CategAndSubCateg.defaultProps = {
  selectData: [],
};

export default CategAndSubCateg;
