import React from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import SERVER from '../../server_address'
function EndGameButton() {
    const currentUser = useSelector(state => state.settings.user);
    const score = useSelector(state => state.game.score);
    const id = useSelector(state => state.game.id);
    async function endGame(){
        let username = currentUser.username;
        console.log(currentUser)
        if( username === "Guest"){
            const { value: name } = await Swal.fire({
                icon: 'info',
                title: 'Enter a name to save your score!',
                input: 'text',
                inputLabel: 'Username:',
                inputPlaceholder: 'Enter your username',
                showCancelButton: true,
                inputValidator: (value) => {
                  if (!value) {
                    return 'You need to write something!'
                  }
                }
            });
            if (name) {
                username = name;
            }
            
        }

        //save game here
        const response = await axios.post(SERVER.URL + '/api/save', {
            user: username,
            score: score,
            id: id, }
        );

        if(response.status === 200){
            Swal.fire({
                icon: 'success',
                title:  `Your score of ${score} been saved!`,
                text:  'You can now view your score on the leaderboard!',
                timer: 3000,
                timerProgressBar: true,
            });
        }

    }   
  return (
    <div id='end-game-button' style={{
        position: 'fixed',
        fontFamily: 'Category-Name',
        fontSize: 'calc(1vh + 1vw)',
        height:'4vh',
        width: '10vw',
        alignContent: 'center',
        textAlign: 'center',
        top: '2%',
        left: '60%',
        cursor: 'pointer',
        backgroundColor: '#8D2AB5',
        color: 'white',
        border: 'black',
        zIndex: '1',
        margin: '10px',
        borderRadius: '10px',
    }}
    onClick={endGame}
    >End Game</div>
  )
}

export default EndGameButton