import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";

const Record = (props) => (
  <tr>
    <td>{props.record.id}</td>
    <td>{props.record.category.title}</td>
    <td>{props.record.question}</td>
    <td>{props.record.answer}</td>
    <td>{props.record.value}</td>
    <td>{props.record.airdate}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records,  setRecords] = useState([]);
  const [searchQuestion, setQuestion] = useState([""]);
  const [searchAnswer, setAnswer] = useState([""]);
  const [searchCategory, setCategory] = useState("");
  const [searchValue, setValue] = useState(0);



  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/api/questions?question=${searchQuestion}&answer=${searchAnswer}&category=${searchCategory}&value=${searchValue}`);
      
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      console.log(records);
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length,  setRecords, searchQuestion,  searchAnswer, searchCategory,  searchValue ]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    try{
      return records.map((record) => {
        return (
          <Record
            record={record}
            deleteRecord={() => deleteRecord(record._id)}
            key={record._id}
          />
        );
      });
    }
    catch(e){
      console.log(e);
    }
  }

  const updateQuestion = (query, field) => {
    if(field === 'Question'){
      setQuestion(query);
    }
    else if(field === 'Answer'){
      setAnswer(query);
    }
    else if(field === 'Category'){
      setCategory(query);
    }
    else if(field === 'Value'){
      setValue(query);
    }
  }
  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Questions Search</h3>
      <SearchBar onChange={updateQuestion} />
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
        
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Value</th>
            <th>Airdate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
