import { useState } from 'react';

const defaultOnChange = () => console.warn('未提供change回调');

function useControlledProps<T>(value?: T, onChange: (val: T) => void = defaultOnChange) {
  const [val, setVal] = useState(value);

  if (value !== undefined) return [value, onChange];
  return [val, setVal];
}

export default useControlledProps;
