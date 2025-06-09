import React from 'react';

const Input = ({ className, type = 'text', value, onChange, placeholder, autoFocus, ...rest }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      autoFocus={autoFocus}
      {...rest}
    />
  );
};

export default Input;