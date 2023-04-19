import { useState } from 'react';
import axios from 'axios';
import SERVER from '../server_address'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import "../styles/GeneralStyles.css"

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(SERVER.URL + '/signup', {
        username,
        email,
        password,
      });
      console.log(response);
      console.log(response.data);
      // redirect to the home page
      Swal.fire({
        icon: 'success',
        title:  'formFilledOutCorrectly = true :)',
        text:  'Thanks for signing up! Welcome to \'Play Jeopardy\'!'});

      navigate('/');
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title:  'formFilledOutCorrectly = false :(',
        text:  'You probably made a tiny typo, or perhaps you\'re quickly trying out the sign-up functionality',
      });

    }
  };

  return (
    <form onSubmit={handleSubmit}style={{
      color: 'white',
    }}>
      <div className='box'>
        <div className='userForm'>
          <div style={{paddingRight: '20px', display: 'inline-block'}}>Username:</div>
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <br />
        <div className='userForm'>
          <div style={{paddingRight: '20px', paddingLeft: '50px', display: 'inline-block'}}>Email:</div>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <br />
          <div className='userForm'>
            <div style={{paddingRight: '20px', display: 'inline-block'}}>Password:</div>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
        <br />
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
}

export default SignupForm;
