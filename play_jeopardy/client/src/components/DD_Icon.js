import { ReactComponent as DD_ICON } from "./DD_Icon.svg";
function DdIcon(props) {
  if(props.isDD){
     return (
      <td>
        {<DD_ICON height="4em" width="4em"/>}
      </td>
    );
    }
    else{
        return (
            <td>
              
            </td>
        );
    }

    
  
    
  }
  export default DdIcon;