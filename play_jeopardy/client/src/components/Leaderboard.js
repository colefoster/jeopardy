import React from 'react'
import Table from 'react-bootstrap/Table';
import "../styles/GeneralStyles.css"
import SERVER from '../server_address';
import { useEffect, useState } from 'react';
import moment from 'moment';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([{}]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const response = await fetch(SERVER.URL + '/api/leaderboard');
      console.log(response);
      const data = await response.json();
      console.log(data);
      setLeaderboard(data);
    }
    fetchLeaderboard();
  }, [setLeaderboard]);

  if(!leaderboard) {
    return (<div>Loading...</div>);
  }
  
  return (
    <div style={{paddingLeft: '5%', paddingRight: '5%', width: '70%', margin: 'auto'}}>
            <Table className='leaderboard' striped bordered >
                <thead style={{backgroundColor: '#050A36'}}><tr>
                    <th>Date</th>
                    <th>Username</th>
                    <th>Score</th>
                </tr></thead>
                <tbody>
                {leaderboard.map((val, key) => {
                    return (
                        <tr key={key}>
                        <td>{moment(val.date).format("MMMM Do, h:mm a")}</td>
                        <td>{val.user || "Guest"}</td>
                        <td style={{color: '#f9c145', fontFamily: 'Dollar-Amount', textShadow:'4px 2px #000000'}}>${val.score}</td>
                        </tr>
                    )
                    })}
                </tbody>
            </Table>
        </div>
  );
}

export default Leaderboard;
