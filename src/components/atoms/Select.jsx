import React from 'react';

const Select = ({ children, className, value, onChange, ...rest }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={className}
      {...rest}
    >
      {children}
    </select>
  );
};

export default Select;