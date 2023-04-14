import axios from 'axios';

function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await axios.get('/logout');
      console.log(response.data);
      // redirect to the home page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
}

export default LogoutButton;
