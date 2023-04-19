import { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';
import SERVER from 'server_address';

import "../styles/GeneralStyles.css"

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
          <input type="text" name='username' value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <br />
          <div className='userForm'>
            <div style={{paddingRight: '20px', display: 'inline-block'}}>Password:</div>
            <input type="password" name='password' value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
        <br />
        <button type="submit">Log In</button>
      </div>
    </form>
  );
}

export default LoginForm;
