import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./questionSearchBar";
import AirDate from "./airDate";
import DdIcon from "./DD_Icon";
require("dotenv").config({ path: "../config.env" });

 const server = process.env.SERVER_URL;

const Record = (props) => (
  <tr>
    <td>{props.record.id}</td>
    <td>{props.record.category}</td>
    <td>{props.record.clue}</td>
    <td>{props.record.response}</td>
    <td>{props.record.round}</td>
    <td>{props.record.value}</td>
    <DdIcon isDD= {props.record.isDailyDouble}/>
    <AirDate date = {props.record.airdate} />
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
  const [searchRound, setRound] = useState("");
  const [searchValue, setValue] = useState(0);
  const [searchDD, setDD] = useState("");

  


  useEffect(() => {

    async function getRecords() {
      const response = await fetch(`${server}/api/questions?question=`+
      `${searchQuestion}&answer=${searchAnswer}&category=${searchCategory}&value=${searchValue}&round=${searchRound}&isDailyDouble=${searchDD}`);
      
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
  }, [records.length,  setRecords, searchQuestion,  searchAnswer, searchCategory,  searchValue ,searchRound, searchDD]);

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
      if(query !== searchQuestion)
      setQuestion(query);
    }
    else if(field === 'Answer'){
      if(query !== searchAnswer)
      setAnswer(query);
    }
    else if(field === 'Category'){
      if(query !== searchCategory)
        setCategory(query);
    }
    else if(field === 'Value'){
      if(query !== searchValue)
      setValue(query);
    }
    else if(field === 'Round'){
      if(query !== searchRound)
      setRound(query);
    }
    else if(field === 'DD'){
      if(query !== searchDD){
        if(query === 'true')
          setDD(true);
        else if(query === 'false')
          setDD(false);
        else
          setDD("");
      }
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
            <th>Round</th>
            <th>Value</th>
            <th>DD</th>
            <th>Airdate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
