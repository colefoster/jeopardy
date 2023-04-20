import React, {useState} from 'react'
import AutosizeInput from 'react-input-autosize';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import '../../styles/QuestionStyles.css';
import { useSelector, useDispatch } from 'react-redux';
import { adjustScore } from '../../redux/gameSlice';

const InputHandling = (props)=> {
  const [inputValue, setUserInput ] = useState("");
  const dispatch = useDispatch();
  const generateDistractors = useSelector(state => state.settings.generateDistractors);
         
 

  function checkAnswer(){
    console.log(inputValue);
    if(inputValue.length === 0){
      //User didnt type anything
      Swal.fire({
        title: 'Oops!',
        text: 'You didnt type anything! Interesting strategy...',
        icon: 'question',
        confirmButtonText: 'Cool'
      })
    }
    else if(inputValue.toUpperCase() === props.answer.toUpperCase()){
      Swal.fire({
        title: 'Correct!',
        text: 'You got it right!',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      dispatch(adjustScore(props.value))
    } else {
      Swal.fire({
        title: 'Incorrect!',
        text: 'You got it wrong!\nCorrect answer: ' + props.answer,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      dispatch(adjustScore(-props.value))
    }
    

    //close question here
    props.closeCardFunction();
  }

  function checkMultipleChoiceAnswer(guess){
    if(guess === props.answer){
      Swal.fire({
        title: 'Correct!',
        text: 'You got it right!',
        icon: 'success',
        timer: 5000,
        timerProgressBar: true,

      }).then(props.closeCardFunction());
      dispatch(adjustScore(props.value))
    } else {
      Swal.fire({
        title: 'Incorrect!',
        text: 'You got it wrong!\nCorrect answer: ' + props.answer,
        icon: 'error',
        timer: 5000,
        timerProgressBar: true,
        didClose: () => {
          console.log('The alert was closed by the timer');
          props.closeCardFunction();
          dispatch(adjustScore(-props.value))
        }
      })      
    }

    
  }
  


  

  if(generateDistractors){

    return (
      <div 
        ref={props.inputRef}
        className='multipleChoiceDiv'>
        <button
          className='multipleChoiceButton'
          style={{backgroundColor: 'MediumSlateBlue'}}
          onClick={() =>{checkMultipleChoiceAnswer(props.distractors[0])}}>
            {props.distractors[0].toUpperCase()}
        </button>
          
        <button
          className='multipleChoiceButton'
          style={{backgroundColor: 'mediumorchid'}}
          onClick={() =>{checkMultipleChoiceAnswer(props.distractors[1])}}>
            {props.distractors[1].toUpperCase()}
        </button>
            
        <button
          className='multipleChoiceButton'
          style={{backgroundColor: 'PaleVioletRed'}}
          onClick={() =>{checkMultipleChoiceAnswer(props.distractors[2])}}>
            {props.distractors[2].toUpperCase()}
        </button>
            
            
        <button
          className='multipleChoiceButton'
          style={{backgroundColor: 'RoyalBlue'}}
          onClick={() =>{checkMultipleChoiceAnswer(props.distractors[3])}}>
            {props.distractors[3].toUpperCase()}
        </button>
      </div>
          
    );
  }else {
    return (
    
    <div 
      ref={props.inputRef}
      style={{
        display: 'none',
        position: 'fixed',
        left: '50%',
        bottom:'12%',
        zIndex: '5',
        overflow: 'visible',
        transform: 'translate(-50%, 50%)'

      }}>

      <AutosizeInput
          placeholder="What is...?"
          minWidth={150}
          maxLength={75}
          value={inputValue}
          onChange={function (event){setUserInput(event.target.value)}}
          style={{ background: '#eee', borderRadius: 5, padding: 5, fontStyle: 'bold'  }}
          inputStyle={{ border: '1px solid #999', borderRadius: 3, padding: 3, fontSize: 25, fontWeight: 'bold', color:'black' }}
        />

      <div style={{display: 'inline', paddingRight: '10px'}}></div>

      <button
            style={{
              display: 'inline',
              fontSize: '1.5em',
              float: 'right',
              height: '55px',
              width: '100px',
              backgroundColor: '#0D1557',
              borderColor: 'black',
              borderRadius: '10px',
              color: 'white',
              fontFamily: 'Swis721 BlkCn BT',
                }}
                
                onClick={checkAnswer}>
                Check
          </button>
          &nbsp;

      </div>
    )
  }
 
}
export default InputHandling