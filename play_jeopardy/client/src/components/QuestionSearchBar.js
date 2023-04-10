import React from 'react';
const tableStyle = {
    margin: '0 auto',
    borderSpacing: '10px',
    border: '1px solid black',
    borderCollapse: 'separate'
};

const SearchBar = ({ onChange }) => {
  return (
    <div>
        
        <table  border-spacing="165px;" border-collapse="separate" style={tableStyle}>
            <tbody>
            <tr>
            <th>
                    <label htmlFor="Category">Category: </label>
                </th>
                <th></th>
                <th>
                    <label htmlFor="Question">Question: </label>
                </th>
                <th></th>
                <th>
                    <label htmlFor="Answer">Answer: </label>
                </th>
                <th></th>
                
                <th>
                    <label htmlFor="Round">Round: </label>
                </th>
                <th></th>
                <th>
                    <label htmlFor="Value">Value: </label>
                </th>
                <th></th>
                <th>
                    <label htmlFor="Value">Daily Double: </label>
                </th>
            </tr>
            <tr>
            <td>
                    <input name="Category" type="text" placeholder="Category" onChange={(e) => onChange(e.target.value, "Category")} />
                    
                </td>
                <td></td>

                <td>
                    <input name="Question" type="text" placeholder="Question" onChange={(e) => onChange(e.target.value, "Question")} />

                </td>
                <td></td>
                <td>
                    <input name="Answer" type="text" placeholder="Answer" onChange={(e) => onChange(e.target.value, "Answer")} />
                </td>
                <td></td>
                
                <td>
                    <select name="Round" id="Round" onChange={(e) => onChange(e.target.value, "Round")}>
                        <option value="Any">Any</option>
                        <option value="Jeopardy">Jeopardy</option>
                        <option value="Double Jeopardy">Double Jeopardy</option>
                        <option value="Final Jeopardy">Final Jeopardy</option>
                    </select>
                </td>
                <td></td>
                <td>
                    <select name="Value" id="Value" onChange={(e) => onChange(e.target.value, "Value")}>
                        <option value="0">Any</option>
                        <option value="200">200</option>
                        <option value="400">400</option>
                        <option value="600">600</option>
                        <option value="800">800</option>
                        <option value="1000">1000</option>
                        <option value="1200">1200</option>
                        <option value="1600">1600</option>
                        <option value="2000">2000</option>
                    </select>
                </td>
                <td></td>
                <td>
                    <select name="DD" id="DD" onChange={(e) => onChange(e.target.value, "DD")}>
                        <option value="0">Any</option>
                        <option value="true">Daily Double</option>
                        <option value="false">Not Daily Double</option>
                    </select>
                </td>
            </tr>
            </tbody>
        </table>    
    </div>
  );
};

export default SearchBar;
