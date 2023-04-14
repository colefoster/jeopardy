
function AirDate(props) {

  const dateOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }

  
    
  let formattedDate = "";
  try{
    let newDate = new Date(props.date);
    formattedDate = newDate.toLocaleDateString('en-US', dateOptions);
  }
  catch(e){
    formattedDate = "N/A";
  }
  
  

  return (
    <td>
      {formattedDate}
    </td>
  );
}
export default AirDate;