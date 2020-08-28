import React from 'react';
import './spinner.css';

const Spinner = () => {
  return (
    <div
      style={{ position: 'absolute', top: '100%', left: '50%' }}
      className='lds-ring'
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
