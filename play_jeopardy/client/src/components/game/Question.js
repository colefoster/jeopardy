import React, {useRef} from 'react';
import '../../styles/JeopardyBoard.css'
import Tilt from 'react-parallax-tilt'
import parse from 'html-react-parser';
const Question = (props) => {
  
  const questionCardRef = useRef(null);
  const answerCardRef = useRef(null);

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
    event.stopPropagation();//Stops the other event handlers from firing, which messes up the card closing
  }
  return (
    <>
      <Tilt scale={1.2}>
        <div style={{
          display: props.flipped ? 'none' : 'block',
        }}>
        {`$${200 * (props.index + 1)}`}
        </div>
      </Tilt>
      <div ref={questionCardRef} className="card" onClick={handleQuestionCardClick} style={{
        display: props.flipped ? 'block' : 'none',
      }}>
        <div className="close" onClick={handleCloseCard}>
            &#x2716;
        </div>
        <div className="card-content">
          {parse(String(props.question).toUpperCase())}
        </div>
      </div>
      <div ref={answerCardRef} className="card" onClick={handleAnswerCardClick} style={{
        display: 'none',
        overflow: 'visible',
      }}>
        <div className="close" onClick={handleCloseCard}>
            &#x2716;
          </div>
        <div className="card-content">
          {parse(String(props.answer).toUpperCase().replace(/\\'/g, "'"))//replace all instances of \' with just '
          } 
        </div>
      </div>
    </>
  );
};

export default Question;
