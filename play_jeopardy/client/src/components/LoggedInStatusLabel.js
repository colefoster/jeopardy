import React from 'react';
import SERVER from '../server_address';
import axios from 'axios';

const LoggedInStatusLabel = () => {

  return (
    <button  onClick={async() => {
        try{
          axios.get(SERVER.URL + '/api/user', {
            withCredentials: true
          })
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error(error);
            });
            
            
        }
        catch(error){
            console.error(error);
            console.log("Error in GET /user attempt");
        }

    }}
    >
      {"Test /user Route"}
    </button>
  );
};

export default LoggedInStatusLabel;
