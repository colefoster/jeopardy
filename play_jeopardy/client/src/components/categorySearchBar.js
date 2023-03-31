import React from 'react';
const tableStyle = {
    margin: '0 auto',
    borderSpacing: '10px',
    border: '1px solid black',
    borderCollapse: 'separate'
};

const CategorySearchBar = ({ onChange }) => {
  return (
    <div>
        
        <table  border-spacing="165px;" border-collapse="separate" style={tableStyle}>
            <tbody>
            <tr>
            <th>
                    <label htmlFor="Title">Category Title Includes: </label>
                </th>
                <th></th>
                <th>
                    <label htmlFor="Min">Minimum Questions: </label>
                </th>
                <th></th>
                <th>
                    <label htmlFor="Max">Maximum Questions: </label>
                </th>
                </tr>
                <tr>
                <td>
                    <input name="Title" type="text" placeholder="Title" onChange={(e) => onChange(e.target.value, "Title")} />
                    </td>
                    <td></td>
                    <td>
                    <input name="Min"  type="range" min="0" max = "500" value="0" onChange={(e) => onChange(e.target.value, "Min")} />
                    </td>
                    <td></td>
                    <td>
                    <input name="Max" type="range" min="1" max="500" value="500" onChange={(e) => onChange(e.target.value, "Max")} />
                    </td>

            </tr>
            </tbody>
        </table>    
    </div>
  );
};

export default CategorySearchBar;
