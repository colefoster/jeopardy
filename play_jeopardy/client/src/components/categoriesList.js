import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategorySearchBar from "./categorySearchBar";
require("dotenv").config({ path: "../config.env" });

var constants = require('../constants');
const SERVER = constants.SERVER;

const Record = (props) => (
  <tr>
    <td>{props.record.id}</td>
    <td>{props.record.title}</td>
    <td>{props.record.clues_count}</td>    
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
  const [searchTitle, setTitle] = useState([""]);
  const [searchMin, setMin] = useState([0]);
    const [searchMax, setMax] = useState([0]);


  useEffect(() => {

    async function getRecords() {
      const response = await fetch(`${SERVER}/api/categories?title=`+
      `${searchTitle}&countMin=${searchMin}&countMax=${searchMax}`);
      
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
  }, [records.length,  setRecords, searchTitle,  searchMin, searchMax]);

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

  const updateCatSearch = (query, field) => {
    if(field === 'Title'){
      if(query !== searchTitle)
      setTitle(query);
    }
    else if(field === 'Min'){
      if(query !== searchMin)
      setMin(query);
    }
    else if(field === 'Max'){
        if(query !== searchMax)
        setMax(query);
      }
  }
  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Category Search</h3>
      <CategorySearchBar onChange={updateCatSearch} />
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Title</th>
            <th>Number of Questions</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
