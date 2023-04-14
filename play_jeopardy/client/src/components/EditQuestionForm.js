import React, { useState } from "react";

const EditQuestionForm = ({ initialValue, onSave }) => {
  const [id] = useState(initialValue.id);
  const [clue, setClue] = useState(initialValue.clue);
  const [response, setResponse] = useState(initialValue.response);
  const [category, setCategory] = useState(initialValue.category);
  const [isDailyDouble, setIsDailyDouble] = useState(initialValue.isDailyDouble);
  const [round, setRound] = useState(initialValue.round);
  const [value, setValue] = useState(initialValue.value);
  const [distractors, setDistractors] = useState(initialValue.distractors);
  const [userId, setUserId] = useState(initialValue.user_id);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      id,
      clue,
      response,
      category,
      isDailyDouble,
      round,
      value,
      distractors,
      user_id: userId,
    });
  };

  return (
    <form className="edit-form">
      <div className="form-group">
        <label htmlFor="clue">Clue:</label>
        <input
          type="text"
          id="clue"
          value={clue}
          onChange={(e) => setClue(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="response">Response: </label>
        <input
          type="text"
          id="response"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category: </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="isDailyDouble">Daily Double: </label>
        <input
          type="checkbox"
          id="isDailyDouble"
          checked={isDailyDouble}
          onChange={(e) => setIsDailyDouble(e.target.checked)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="round">Round: </label>
        <select
          id="round"
          value={round}
          onChange={(e) => setRound(e.target.value)}
        >
          <option value="Jeopardy">Jeopardy</option>
          <option value="Double Jeopardy">Double Jeopardy</option>
          <option value="Final Jeopardy">Final Jeopardy</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="value">Value: </label>
        <input
          type="number"
          id="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="distractors">Distractors:</label>
        <input
          type="text"
          id="distractors"
          value={distractors}
          onChange={(e) => setDistractors(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="userId">User ID: </label>
        <input
          type="number"
          id="userId"
      value={userId}
      onChange={(e) => setUserId(e.target.value)}
    />
  </div>
  <div className="form-group">
    <button className="save-button" onClick={handleSubmit}>
      Save
    </button>
  </div>
</form>
  );
};

export default EditQuestionForm;
