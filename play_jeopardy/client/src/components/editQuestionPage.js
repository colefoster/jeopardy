import React from 'react'
import EditQuestionForm from './editQuestionForm'
import {useLocation} from "react-router-dom";

var constants = require('../constants');

function sendPutRequest(data) {
    return fetch(constants.SERVER + "/api/userquestions", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

const EditQuestionPage = (props) => {
    const location = useLocation();
    const {question } = location.state;
    console.log(question);
    return (
    <div>
        <EditQuestionForm initialValue={question} onSave={sendPutRequest} />
    </div>
  )
};

export default EditQuestionPage;