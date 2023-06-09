import { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';
import SERVER from 'server_address';

import { useDispatch } from 'react-redux';
import {setUser } from '../redux/settingsSlice';


import "../styles/GeneralStyles.css"


const LoginForm = () =>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(SERVER.URL + '/login', {
        username,
        password,
      });
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title:  'You\'re logged in!',
        text:  'You can now play the game!',
      });
      navigate('/');
      dispatch(setUser(response.data));
      // redirect to the home page
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title:  'That Username and Password Combo doesn\'t exist!',
        text:  'You probably made a tiny typo, or you\'re quickly trying out the login functionality ;)',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      color: 'white',
    }}>
      <div className='box'>
        <div className='userForm'>
          <div style={{paddingRight: '20px', display: 'inline-block'}}>Username:</div>
          <input type="text" name='username' value={username} onChange={(event) => setUsername(event.target.value)} style={{borderRadius: '5px'}}/>
        </div>
        <br />
          <div className='userForm'>
            <div style={{paddingRight: '20px', paddingLeft: '5px', display: 'inline-block'}}>Password:</div>
            <input type="password" name='password' value={password} onChange={(event) => setPassword(event.target.value)} style={{borderRadius: '5px'}}/>
          </div>
        <br />
        <button type="submit" style={{
          backgroundColor: '#0D1557',
          borderColor: 'black',
          borderRadius: '10px',
          color: 'white',
          padding: '5px 32px',
          textAlign: 'center',
          display: 'inline-block',
          fontSize: '25px',
          fontFamily: 'Swis721 BlkCn BT',
        }}>Log In</button>
      </div>
    </form>
  );
}

export default LoginForm;
