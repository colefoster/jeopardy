import React from 'react'
import Table from 'react-bootstrap/Table';
import "../styles/GeneralStyles.css"
import SERVER from '../server_address';
import { useEffect, useState } from 'react';


function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState[{}];

  useEffect(() => {
    async function fetchLeaderboard() {
      const response = await fetch(SERVER.url + '/api/leaderboard');
      const data = await response.json();
      setLeaderboard(data);
    }
    fetchLeaderboard();
  }, [setLeaderboard]);

  return (
    <div style={{paddingLeft: '5%', paddingRight: '5%', width: '70%', margin: 'auto'}}>
            <Table className='leaderboard' striped bordered hover>
                <thead style={{backgroundColor: '#050A36'}}>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Score</th>
                </thead>
                <tbody>
                    {leaderboard.map((val, key) => {
                    return (
                        <tr key={key}>
                        <td>{val.rank}</td>
                        <td>{val.username}</td>
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
