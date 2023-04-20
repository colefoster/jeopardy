import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} style={{
        background: 'transparent',
        color: 'white',
        border: 'none',
        fontSize: 'calc(5vw + 5vh)',
        position: 'absolute',
        left: '2vw',
        top: '-0.5vh',
        zIndex: '20',
    }}>
      &#x2190;
    </button>
  );
};

export default BackButton;
