import React from 'react';
import SmallInput from './components/SmallInput/SmallInput';

const InputFromTo = () => {
  return (
    <div>
      <SmallInput />
      <span style={{ width: 10, height: 10 }}>-</span>
      <SmallInput />
    </div>
  );
};

export default InputFromTo;
