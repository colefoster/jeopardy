import React from 'react';
import axios from 'axios';
import SERVER from '../server_address';
const SignedInStatusLabel = () => {

  return (
    <button  onClick={async() => {
        console.log('GET /user');
        try{
            const response = await axios.get(SERVER.URL + '/user');
            console.log(response);
            console.log(response.data);
        }
        catch(error){
            console.error(error);
            console.log("Error in GET /user attempt");
        }

    }}
    style={{
        background: 'transparent',
        color: 'white',
        border: 'none',
        fontSize: 'calc(1vw + 1vh)',
        position: 'absolute',
        right: '2vw',
        top: '2vh',
        zIndex: '20',
    }}>
      {"GET /user"}
    </button>
  );
};

export default SignedInStatusLabel;
