import React from 'react';

const QuestionTableHeader = ({ onChange }) => {
    const buttonStyle = {
        border: 'none',
        background: 'none',
        fontWeight: 'bold',
      };
  return (
    <thead>
          <tr>
            <th><button name="id_header" style={buttonStyle} onClick={() => {onChange("id")}}>ID</button></th>
            <th><button name="category_header"style={buttonStyle} onClick={() => {onChange("category")}}>Category</button></th>
            <th><button name="clue_header" style={buttonStyle} onClick={() => {onChange("clue")}}>Question</button></th>
            <th><button name="response_header" style={buttonStyle} onClick={() => {onChange("response")}}>Answer</button></th>
            <th><button name="round_header" style={buttonStyle} onClick={() => {onChange("round")}}>Round</button></th>
            <th><button name="value_header" style={buttonStyle} onClick={() => {onChange("value")}}>Value</button></th>
            <th><button name="isDailyDouble_header" style={buttonStyle} onClick={() => {onChange("isDailyDouble")}}>DD</button></th>
            <th><button name="airdate_header" style={buttonStyle} onClick={() => {onChange("clues_count")}}>Airdate</button></th>
            <th>Actions</th>
          </tr>
        </thead>
  );
};

export default QuestionTableHeader;
