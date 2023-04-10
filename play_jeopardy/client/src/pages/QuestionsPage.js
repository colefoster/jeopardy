import React, { useEffect, useState } from "react";
import parse from 'html-react-parser';

import SearchBar from "../components/QuestionSearchBar";
import AirDate from "../components/AirDate";
import DdIcon from "../components/DD_Icon";
import QuestionTableHeader from "../components/QuestionTableHeader";
import RegexEnabledLabel from "../components/RegexEnabledLabel";

import SERVER from '../server_address'

const Record = (props) => (
  <tr>
    <td>{props.record.id}</td>
    <td>{props.record.category}</td>
    <td>{parse(props.record.clue)}</td>
    <td>{parse(props.record.response)}</td>
    <td>{props.record.round}</td>
    <td>{props.record.value}</td>
    <DdIcon isDD= {props.record.isDailyDouble}/>
    <AirDate date = {props.record.airdate} />
    <td></td>
  </tr>
);

const QuestionsPage=()=> {
  const [records,  setRecords] = useState([]);
  const [searchQuestion, setQuestion] = useState([""]);
  const [searchAnswer, setAnswer] = useState([""]);
  const [searchCategory, setCategory] = useState("");
  const [searchRound, setRound] = useState("");
  const [searchValue, setValue] = useState(0);
  const [searchDD, setDD] = useState("");
  const [searchSort, setSort] = useState("");

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(SERVER.URL + `/api/questions?question=`+
      `${searchQuestion}&answer=${searchAnswer}&category=${searchCategory}&value=${searchValue}&round=${searchRound}&isDailyDouble=${searchDD}`+
      `${(searchSort === "") ? "" : "&sort=" + searchSort}`);
      
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length,  setRecords, searchQuestion,  searchAnswer, searchCategory,  searchValue ,searchRound, searchDD, searchSort]);

 

  // This method will map out the records on the table
  function List() {
    try{
      return records.map((record) => {
        return (
          <Record
            record={record}
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

  const updateSort = (sortBy) => {
    if(sortBy === searchSort){ //already sorted by this field
      setSort("-" + sortBy);
      document.getElementsByName(sortBy + "_header")[0].style.color = "Red";
    }
    else if ("-" + sortBy === searchSort){ //already sorted by this field in reverse
      setSort("");
      document.getElementsByName(sortBy + "_header")[0].style.color = "black";
      
    }
    else{ //not sorted by this field
      setSort(sortBy);
      document.getElementsByName("id_header")[0].style.color = "black";
      document.getElementsByName("category_header")[0].style.color = "black";
      document.getElementsByName("clue_header")[0].style.color = "black";
      document.getElementsByName("response_header")[0].style.color = "black";
      document.getElementsByName("round_header")[0].style.color = "black";
      document.getElementsByName("value_header")[0].style.color = "black";
      document.getElementsByName("isDailyDouble_header")[0].style.color = "black";
      document.getElementsByName("airdate_header")[0].style.color = "black";
      document.getElementsByName(sortBy + "_header")[0].style.color = "LawnGreen";
    }
  }
  return (
    <div>
      <h3>Questions Search <RegexEnabledLabel /></h3>
      
      <SearchBar onChange={updateQuestion} />
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <QuestionTableHeader onChange={updateSort}/>
        <tbody>{List()}</tbody>
      </table>
    </div>
  );
}

export default QuestionsPage;