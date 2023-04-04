import React, { useState } from 'react'
import EditQuestionForm from './editQuestionForm'
import {useLocation} from "react-router-dom";
import AlertCard from "./alertCard";

var constants = require('../constants');



const EditQuestionPage = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const location = useLocation();
    const {question } = location.state;



    async function sendPutRequest(data) {
        const response = await fetch(constants.SERVER + "/api/userquestions", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log(response);
            if (response.status === 201) {
                console.log("success");
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            setTimeout(() =>{window.location = "/userquestions"}, 3200);
            }
            else{
                console.log("error");
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
                setTimeout(() =>{window.location = "/userquestions"}, 3200);
            }
        
    }

    return (
    <div>
        {showSuccess && (
      <AlertCard type="success" message="Request successful!" />
    )}
    {showError && <AlertCard type="error" message="Request failed." />}
        <EditQuestionForm initialValue={question} onSave={sendPutRequest} />
    </div>
  )
};

export default EditQuestionPage;