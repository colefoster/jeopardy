import React, { useState } from "react";
import AlertCard from "./alertCard";
import constants from "../constants";
import Axios from "axios"; //for sending post request

const AddQuestionForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [newObject, setNewObject] = useState({
    id: "",
    question: "",
    answer: "",
    category: "",
    isDailyDouble: false,
    round: "",
    value: "",
    distractors: [],
    user_id: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewObject((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setNewObject((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleDistractorsChange = (event) => {
    const { value } = event.target;
    const distractors = value.split(",");
    setNewObject((prevState) => ({
      ...prevState,
      distractors
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios({
      method: "post",
      url: constants.SERVER + "/api/userquestions",
      data: newObject
    }).then(function(response){
      console.log(response);
      if(response.status === 200){
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
    });
    //Return user to list of user questions
    
  }


  return (
    <div>
    {showSuccess && (
      <AlertCard type="success" message="Request successful!" />
    )}
    {showError && <AlertCard type="error" message="Request failed." />}
    
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="clue">Clue:</label>
        <input
          type="text"
          id="clue"
          name="clue"
          value={newObject.clue}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="response">Response:</label>
        <input
          type="text"
          id="response"
          name="response"
          value={newObject.response}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={newObject.category}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="isDailyDouble">Is Daily Double:</label>
        <input
          type="checkbox"
          id="isDailyDouble"
          name="isDailyDouble"
          checked={newObject.isDailyDouble}
          onChange={handleCheckboxChange}
        />
      </div>
      <div>
        <label htmlFor="round">Round:</label>
        <select
          id="round"
          name="round"
          value={newObject.round}
          onChange={handleInputChange}
        >
          <option value="">Select a round</option>
          <option value="Jeopardy">Jeopardy</option>
          <option value="Double Jeopardy">Double Jeopardy</option>
          <option value="Final Jeopardy">Final Jeopardy</option>
        </select>
      </div>
      <div>
        <label htmlFor="value">Value:</label>
        <input
          type="number"
          id="value"
          name="value"
          value={newObject.value}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="distractors">Distractors:</label>
        <input
          type="text"
          id="distractors"
          name="distractors"
          value={newObject.distractors.join(",")}
          onChange={handleDistractorsChange}
        />
      </div>
      <div>
        <label htmlFor="user_id">User ID:</label>
        <input
          type="number"
          id="user_id"
          name="user_id"
          value={newObject.user_id}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Create Object</button>
    </form>
    </div>
  );
}    
export default AddQuestionForm;