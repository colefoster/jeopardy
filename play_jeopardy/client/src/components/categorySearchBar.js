import React from 'react';
const tableStyle = {
    margin: '0 auto',
    borderSpacing: '10px',
    border: '1px solid black',
    borderCollapse: 'separate'
};
let minValue = 0;
let maxValue = 500;
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
                    <label htmlFor="Min">Min Questions {minValue}</label>
                </th>
                <th></th>
                <th>
                    <label htmlFor="Max">Max Questions {maxValue}</label>
                </th>
                </tr>
                <tr>
                <td>
                    <input name="Title" type="text" placeholder="Title" onChange={(e) => onChange(e.target.value, "Title")} />
                    </td>
                    <td></td>
                    <td>
                    <input name="Min"  type="range" min="0" max = "500" defaultValue="0" onChange={(e) => {minValue = e.target.value;onChange(e.target.value, "Min")}} />
                    </td>
                    <td></td>
                    <td>
                    <input name="Max" type="range" min="1" max="500" defaultValue="500" onChange={(e) => {maxValue = e.target.value; onChange(e.target.value, "Max")}} />
                    </td>

            </tr>
            </tbody>
        </table>    
    </div>
  );
};

export default CategorySearchBar;
