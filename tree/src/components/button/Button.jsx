import React, { useState } from 'react';

import './button.css';

const Button = ({ title, onClick }) => {
  return (
    <button className="blue-btn" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
