import { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';
import SERVER from 'server_address';

import Table from 'react-bootstrap/Table';
import "../styles/GeneralStyles.css"

const data = [
    { rank: 1, username: "Cherry", score: 10000 },
    { rank: 2, username: "Orange", score: 9500 },
    { rank: 3, username: "Kiwi", score: 9200},
  ]

function Leaderboard() {

  return (
    <div className="box" style={{width: '70%'}}>
        <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
            <Table striped bordered>
                <thead>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Score</th>
                </thead>
                <tbody>
                    {data.map((val, key) => {
                    return (
                        <tr key={key}>
                        <td>{val.rank}</td>
                        <td>{val.username}</td>
                        <td>{val.score}</td>
                        </tr>
                    )
                    })}
                </tbody>
            </Table>
        </div>
        </div>
  );
}

export default Leaderboard;
