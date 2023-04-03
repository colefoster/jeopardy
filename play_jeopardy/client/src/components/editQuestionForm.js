import React, { useState } from "react";

const EditQuestionForm = ({ initialValue, onSave }) => {

  const [id, setId] = useState(initialValue.id);
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
    <form onSubmit={handleSubmit}>
      <label>
        ID:
        <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
      </label>
      <label>
        Clue:
        <input type="text" value={clue} onChange={(e) => setClue(e.target.value)} />
      </label>
      <label>
        Response:
        <input type="text" value={response} onChange={(e) => setResponse(e.target.value)} />
      </label>
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <label>
        Is Daily Double:
        <input type="checkbox" checked={isDailyDouble} onChange={(e) => setIsDailyDouble(e.target.checked)} />
      </label>
      <label>
        Round:
        <select value={round} onChange={(e) => setRound(e.target.value)}>
          <option value="Jeopardy!">Jeopardy!</option>
          <option value="Double Jeopardy!">Double Jeopardy!</option>
          <option value="Final Jeopardy!">Final Jeopardy!</option>
        </select>
      </label>
      <label>
        Value:
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
      </label>
      <label>
        Distractors:
        <input type="text" value={distractors} onChange={(e) => setDistractors(e.target.value.split(","))} />
      </label>
      <label>
        User ID:
        <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditQuestionForm;
