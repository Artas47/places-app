import React from 'react';
import './spinner.css';

const Spinner = ({ className, style }) => {
  return (
    <div
      style={style}
      className={`lds-ring ${
        Array.isArray(className) ? className.join(' ') : className
      }`}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
