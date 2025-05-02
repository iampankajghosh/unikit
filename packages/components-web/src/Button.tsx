import React from 'react';

export const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: '#1d4ed8',
        color: '#fff',
        padding: '10px 16px',
        borderRadius: '8px',
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
};
