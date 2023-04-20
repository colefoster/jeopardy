import React, {useState, useRef} from 'react';
import '../../styles/JeopardyBoard.css'
import InputHandling from './InputHandling';
import Tilt from 'react-parallax-tilt'
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { addQuestionAnswered } from '../../redux/gameSlice';
import * as Spaces from 'react-spaces';
import '@fortawesome/fontawesome-free/css/all.css';

import SERVER from '../../server_address';
import Swal from 'sweetalert2';

const Question = (props) => {
  const generateDistractors = useSelector(state => state.settings.generateDistractors);
  const questionsAnswered = useSelector(state => state.game.questionsAnswered) ;
  const model = useSelector(state => state.settings.model);

  const [flipped, setFlipped] = useState(Array.isArray(questionsAnswered) 
                              && questionsAnswered.includes(props.id));
  const [distractors, setDistractors] = useState(["Loading...", "Loading...", "Loading...", "Loading..."]);

  const questionCardRef = useRef(null);
  const questionTextRef = useRef(null);
  const answerCardRef = useRef(null);
  const inputRef = useRef(null);
  const dimmerRef = useRef(null);
  
  const dispatch = useDispatch();

  const endGameButton = document.getElementById('end-game-button');

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
  const apiPrefix = useSelector(state => state.settings.apiPrefix)
  const id = useSelector(state => state.game.id)
  const user= useSelector(state => state.settings.user)
  function handleReveal(){
    if(!flipped){ //if question has not been answered
      console.log(id)
      console.log(user)
      endGameButton.style.display = 'none';
      if(generateDistractors){     
        const generateDistractors =async () =>{
          const question = props.question.replace(/(\([^)]+\)|<[^>]*>)/g, "");
          const category = props.category;
          const answer = props.answer.replace(/\\'/g, "'");
          console.log("Getting wrong answers for question: " + question);
          const response = await fetch(SERVER.URL + `/api/distractors?category=${category}&question=${question}&answer=${answer}&model=${model}&apiPrefix=${apiPrefix}`);
        
        
          if(response.status === 200){
          const data = await response.json();
          var tempDistractors = data.choices[0].message.content;
          tempDistractors= tempDistractors.replace(/\d\. /g, "").replace(/\\'/g, "'").replace(/\d\) /g, "").replace(".", "").replace(/\\'/g, "'").replace('"', '');
          tempDistractors = tempDistractors.split(", ");
          tempDistractors.push(answer);
          setDistractors(shuffle(tempDistractors));
          };
        };
        generateDistractors();
      }

      dispatch(addQuestionAnswered(props.id));
      setFlipped(true);
      questionCardRef.current.style.display = 'block';
      inputRef.current.style.display = 'block';
      dimmerRef.current.style.display = 'block';
    }
  }
  async function handleQuestionCardClick() {
    await Swal.fire({//show answer?
      title: 'Reveal Answer?',
      icon: 'question',
      html: 'You will not lose or gain points',
      showCloseButton: true,
      showCancelButton: true,
      reverseButtons: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fas fa-thumbs-up"></i>',
      cancelButtonText: '<i class="fas fa-thumbs-down"></i>'
    }).then((result) => {
    if(result.isConfirmed){
      answerCardRef.current.style.display = 'block';
      questionCardRef.current.style.display = 'none';
      inputRef.current.style.display = 'none';
    }
  });
  }
  
  function handleCloseCard(event){
    questionCardRef.current.style.display = 'none';
    answerCardRef.current.style.display = 'none';
    inputRef.current.style.display = 'none';
    dimmerRef.current.style.display = 'none';
    endGameButton.style.display = 'block';
    try{
      event.stopPropagation();//Stops the other event handlers from firing, which messes up the card closing
    }catch{}
  }
 
  return (
    <>
    <Spaces.Top
     size="16.8%"
     key={props.id + "_space"} 
     className="questionBox" 
     onClick={handleReveal} 
     style={{
      cursor: flipped ? 'default' : 'pointer',
    }}>
      <Tilt scale={1.2}>
        <div style={{
            display: flipped ? 'none' : 'block',
          }}>
          {`$${200 * (props.index + 1)}`}   {//dollar amount 
                                            }
        </div>
      </Tilt>
    </Spaces.Top>

    <div ref={dimmerRef} className='dimBackground' style={{
        display: 'none',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }} />

      <InputHandling flipped={flipped} inputRef={inputRef} distractors={distractors}{...props} closeCardFunction={handleCloseCard} /> {//answer input box
                                                                                                                                                              // and check answer button
                                                                                                                                              }
      
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


      <div ref={answerCardRef} className="card" onClick={handleCloseCard} style={{
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
