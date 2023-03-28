
function AirDate(props) {

  const dateOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: '2-digit'
  }

  
    
  let formattedDate = "";
  try{
    console.log(props);
    let newDate = new Date(props.date);
    console.log(newDate);
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