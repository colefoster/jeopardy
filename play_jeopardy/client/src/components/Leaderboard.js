import Table from 'react-bootstrap/Table';
import "../styles/GeneralStyles.css"

const data = [
    { rank: 1, username: "Cherry", score: 10000 },
    { rank: 2, username: "Orange", score: 9500 },
    { rank: 3, username: "Kiwi", score: 9200},
    { rank: 4, username: "Apple", score: 8900},
    { rank: 5, username: "Grape", score: 8400},
    //{ rank: 6, username: "Yuzu", score: 8300 },
    //{ rank: 7, username: "Fig", score: 8000 },
    //{ rank: 8, username: "Dragonfruit", score: 7600},
    //{ rank: 9, username: "Cranberry", score: 7100},
    //{ rank: 10, username: "Lychee", score: 6800},
  ]

function Leaderboard() {

  return (
    <div style={{paddingLeft: '5%', paddingRight: '5%', width: '70%', margin: 'auto'}}>
            <Table className='leaderboard' striped bordered hover>
                <thead style={{backgroundColor: '#050A36'}}>
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
