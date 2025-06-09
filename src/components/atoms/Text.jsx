import React from 'react';

const Text = ({ as = 'p', children, className, ...rest }) => {
  const Component = as;
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
};

export default Text;