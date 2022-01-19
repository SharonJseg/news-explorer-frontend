import { useState } from 'react';

const useInput = (validateValue) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const valueIsValid = validateValue(value);
  const hasError = !valueIsValid && touched;

  const handleValueChange = (evt) => {
    setValue(evt.target.value);
  };

  const handleValueBlur = (evt) => {
    setTouched(true);
  };

  const reset = () => {
    setValue('');
    setTouched(false);
  };

  return {
    value,
    isValid: valueIsValid,
    hasError,
    handleValueChange,
    handleValueBlur,
    reset,
  };
};

export default useInput;
