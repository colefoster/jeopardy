import React, {useRef, useState} from 'react';
import '../../styles/JeopardyBoard.css'
import Tilt from 'react-parallax-tilt'
import parse from 'html-react-parser';
import AutosizeInput from 'react-input-autosize';

import * as Spaces from 'react-spaces';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const Question = (props) => {
  const [inputValue, setUserInput ] = useState("");
  const [flipped, setFlipped] = useState(false);

  const questionCardRef = useRef(null);
  const answerCardRef = useRef(null);
  const questionTextRef = useRef(null);
  const inputRef = useRef(null);

  function checkAnswer(){
    if(inputValue.toLowerCase() === props.answer.toLowerCase()){
      Swal.fire({
        title: 'Correct!',
        text: 'You got it right!',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      //handleCloseCard();
    } else {
      Swal.fire({
        title: 'Incorrect!',
        text: 'You got it wrong!\nCorrect answer: ' + props.answer,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }

  function handleReveal(){
    setFlipped(true)
    inputRef.current.style.display = 'block';
    questionCardRef.current.style.display = 'block';
    inputRef.current.focus();
  }

  function handleQuestionCardClick() {
    questionCardRef.current.style.display = 'none';
    answerCardRef.current.style.display = 'block';
  }

  function handleAnswerCardClick() {
    answerCardRef.current.style.display = 'none';
    questionCardRef.current.style.display = 'block';
  }
  
  function handleCloseCard(event){
    questionCardRef.current.style.display = 'none';
    answerCardRef.current.style.display = 'none';
    setFlipped(false);
    inputRef.current.style.display = 'none';

    event.stopPropagation();//Stops the other event handlers from firing, which messes up the card closing
  }
  
  
  return (
    <>
    <Spaces.Top size="16.8%" key={props.id + "_space"} className="questionBox" onClick={handleReveal} >
      <Tilt scale={1.2}>
        <div style={{
          display: flipped ? 'none' : 'block',
        }}>
        {`$${200 * (props.index + 1)}`}
        </div>
      </Tilt>
      </Spaces.Top>


      <div 
      ref={inputRef}
      style={{
        display: flipped ? 'block' : 'none',
        position: 'fixed',
        bottom: '0px',
        left: '50%',
        height: '25%',
        width: '60%',
        zIndex: '5',
        overflow: 'visible',
        transform: 'translate(-50%, 50%)'

     }}>

      <AutosizeInput
        
        name="UserAnswerInput"
        autoFocus
        value={inputValue}
        placeholder='Answer'
        inputStyle={{
          width: '100%',
          textAlign: 'center',
          flex: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={{
          display: flipped ? 'block' : 'none',
          fontSize: '2em',
          position: 'relative',
          bottom: '-20px',
          width: '10vw',
         transform: 'translateX(250%)',
          borderRadius: 5,
          padding: 5,
        }}
        onChange={function(event) {
          // event.target.value contains the new value
          setUserInput(event.target.value);
         
        }}
      />
      <button
            
            style={{
              display: flipped ? 'block' : 'none',
          fontSize: '1.5em',
          position: 'relative',
          bottom: '-20px',
          left: '43%',
          height: '4vh',
          width: '8vw',

            }}
            
            onClick={checkAnswer}>
            Check
      </button>

      </div>


      <div ref={questionCardRef} className="card" onClick={handleQuestionCardClick} style={{
        display: flipped ? 'blocked' : 'none',
      }}>
        <div className="close" onClick={handleCloseCard}>
            &#x2716;
        </div>
        <div ref={questionTextRef} className="card-content">
          <div>
          {parse(String(props.question).toUpperCase().replace(/\\'/g, "'").replace((/\([^)]+\)|<[^>]*>/g), ''))}
        </div></div>
      </div>


      <div ref={answerCardRef} className="card" onClick={handleAnswerCardClick} style={{
        display: 'none',
        overflow: 'visible',
        
      }}>
        <div className="close" onClick={handleCloseCard}>
            &#x2716;
          </div>
        <div className="card-content" style={{
          
          textAlign: 'center',
          flex: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}>
          <div>
          {parse(String(props.answer).toUpperCase().replace(/\\'/g, "'").replace((/\([^)]+\)|<[^>]*>/g), ''))//replace all instances of \' with just '
          } 
        </div></div>
      </div>


    </>
  );
};

export default Question;
