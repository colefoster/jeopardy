import React from 'react';
import SERVER from '../server_address';

let response;
contactServer();
async function contactServer(){
    response = await fetch(`${SERVER.URL}/api/isregexenabled/`);
}

const RegexEnabledLabel =  () =>{
    let isRegexEnabled = false; 
    if (response) {
        isRegexEnabled = response.status === 200;
    }

    return (
        isRegexEnabled ?
        <span style={{color: "grey"}}><small>(Regular Expression Enabled)</small></span> : ""
    );
}

export default RegexEnabledLabel;