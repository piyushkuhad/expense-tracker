import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const FixedSelect = ({
  defaultValue,
  isClearable,
  isSearchable,
  selectData,
  onChange,
}) => {
  const [value, setValue] = useState(update ? selected : {});

  const handleChange = useCallback((inputValue) => setValue(inputValue), []);

  useEffect(() => {
    //console.log(value);
    onChange(value);
  }, [onChange, value]);

  return (
    <Select
      className="cm-fixed-select"
      defaultValue={defaultValue}
      isClearable={isClearable}
      isSearchable={isSearchable}
      name="fixedSelect"
      options={selectData}
      value={value}
      onChange={handleChange}
    />
  );
};

FixedSelect.defaultProps = {
  defaultValue: '',
  isClearable: true,
  isSearchable: true,
  selectData: [],
};

export default FixedSelect;
