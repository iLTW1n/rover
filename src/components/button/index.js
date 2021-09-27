import React from 'react';
import './styles.scss';

const Button = ({ children, ...props }) => (
  <button className='component-button' {...props}>
    { children }
  </button>
);

export default Button;
