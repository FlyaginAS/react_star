import React from 'react';
import './error-indicator.css';
import errImg from './error.png';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={errImg} />
      <span>Something error gone!</span>
    </div>
  );
};
export default ErrorIndicator;
