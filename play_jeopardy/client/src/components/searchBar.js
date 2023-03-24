import React from 'react';

const SearchBar = ({ onChange }) => {
  return (
    <div>
        <table  border-spacing="165px;" border-collapse="separate">
            <tbody>
            <tr>
                <th>
                    <label htmlFor="Question">Question Includes: </label>
                </th>
                <th></th>
                <th>
                    <label htmlFor="Answer">Answer Includes: </label>
                </th>
                <th></th>
                <th>
                    <label htmlFor="Category">Category Includes: </label>
                </th>
                <th></th>
                <th>
                    <label htmlFor="Value">Value: </label>
                </th>
            </tr>
            <tr>
                <td>
                    <input name="Question" type="text" placeholder="Question" onChange={(e) => onChange(e.target.value, "Question")} />

                </td>
                <td></td>
                <td>
                    <input name="Answer" type="text" placeholder="Answer" onChange={(e) => onChange(e.target.value, "Answer")} />
                </td>
                <td></td>
                <td>
                    <input name="Category" type="text" placeholder="Category" onChange={(e) => onChange(e.target.value, "Category")} />
                    
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
                    </select>
                </td>
            </tr>
            </tbody>
        </table>    
    </div>
  );
};

export default SearchBar;
