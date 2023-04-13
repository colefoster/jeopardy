import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} style={{
        color: 'black',
        backgroundColor: 'white',
        border: 'none',
        fontSize: '1.5em',
        position: 'absolute',
        left: '1vw',
        top: '1vh',
        height: '4vh',
        width: '8vw',
        zIndex: '20',
    }}>Back</button>
  );
};

export default BackButton;
