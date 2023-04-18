import React, {useState, useRef} from 'react';
import '../../styles/JeopardyBoard.css'
import InputHandling from './InputHandling';
import Tilt from 'react-parallax-tilt'
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { addQuestionAnswered } from '../../redux/gameSlice';
import * as Spaces from 'react-spaces';

import SERVER from '../../server_address';

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
  function handleReveal(){
    if(!flipped){
      console.log(apiPrefix)
      if(generateDistractors){
        console.log("Generating distractors")
        
        const generateDistractors =async () =>{
          const question = props.question.replace(/(\([^)]+\)|<[^>]*>)/g, "");
          const category = props.category;
          const answer = props.answer;
          console.log("Getting wrong answers for question: " + question);
          const response = await fetch(SERVER.URL + `/api/distractors?category=${category}&question=${question}&answer=${answer}&model=${model}&apiPrefix=${apiPrefix}`);
        
        
          if(response.status === 200){
          const data = await response.json();
          var tempDistractors = data.choices[0].message.content;
          tempDistractors= tempDistractors.replace(/\d\. /g, "").replace(/\\'/g, "'").replace(/\d\) /g, "").replace(".", "").replace(/\\'/g, "'");
          tempDistractors = tempDistractors.split(", ");
          console.log(tempDistractors)
          tempDistractors.push(answer);
          tempDistractors = shuffle(tempDistractors);
          console.log(tempDistractors)
          setDistractors(tempDistractors);
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
    inputRef.current.style.display = 'none';
    dimmerRef.current.style.display = 'none';
    event.stopPropagation();//Stops the other event handlers from firing, which messes up the card closing
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

      <InputHandling flipped={flipped} inputRef={inputRef} distractors={distractors}{...props} /> {//answer input box
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
