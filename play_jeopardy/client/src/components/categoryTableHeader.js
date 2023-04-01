import React from 'react';

const CategoryTableHeader = ({ onChange }) => {
    const buttonStyle = {
        border: 'none',
        background: 'none',
        fontWeight: 'bold',
      };
  return (
    <thead>
          <tr>
            <th><button name="id_header" style={buttonStyle} onClick={() => {onChange("id")}}>ID  </button></th>
            <th><button name="title_header"style={buttonStyle} onClick={() => {onChange("title")}}>Category Title  </button></th>
            <th><button name="clues_count_header" style={buttonStyle} onClick={() => {onChange("clues_count")}}>Number of Questions  </button></th>
          </tr>
        </thead>
  );
};

export default CategoryTableHeader;
