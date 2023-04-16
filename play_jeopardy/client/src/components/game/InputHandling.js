import React, {useState} from 'react'
import AutosizeInput from 'react-input-autosize';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'


export default function InputHandling(props) {
    const [inputValue, setUserInput ] = useState("");

    function checkAnswer(){
        if(inputValue.length === 0){
          //User didnt type anything
          Swal.fire({
            title: 'Oops!',
            text: 'You didnt type anything! Interesting strategy...',
            icon: 'question',
            confirmButtonText: 'Cool'
          })
        }
        else if(inputValue.toLowerCase() === props.answer.toLowerCase()){
          Swal.fire({
            title: 'Correct!',
            text: 'You got it right!',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
    
        } else {
          Swal.fire({
            title: 'Incorrect!',
            text: 'You got it wrong!\nCorrect answer: ' + props.answer,
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      }

  return (
    <div 
      ref={props.inputRef}
      style={{
        display: 'none',
        position: 'fixed',
        left: '50%',
        bottom:'10%',
        zIndex: '5',
        overflow: 'visible',
        transform: 'translate(-50%, 50%)'

     }}>
      <button
            
        style={{
          display: 'inline',
          fontSize: '1.5em',
          float: 'left',
          left: '43%',
          height: '55px',
          width: '80px',

            }}
            
            onClick={checkAnswer}>
            Check
      </button>
      &nbsp;
      <AutosizeInput
					placeholder="What is...?"
					minWidth={150}
					value={inputValue}
					onChange={function (event){setUserInput(event.target.value)}}
					style={{ background: '#eee', borderRadius: 5, padding: 5,fontStyle: 'bold'  }}
					inputStyle={{ border: '1px solid #999', borderRadius: 3, padding: 3, fontSize: 25, fontWeight: 'bold', color:'black' }}
				/>
      

      </div>
  )
}
