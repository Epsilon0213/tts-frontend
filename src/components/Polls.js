import React, { useState, useEffect } from 'react';

const Polls = ({userRole, user = null}) => {
  const [polls, setPolls] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [toggleButtonText, setToggleButtonText] = useState('Poll Toggle On');

  const [answeredList, setAnsweredList] = useState([]);
  const{ uid, displayName, photoURL } = user;



  const handleSubmit = (event) => {
    event.preventDefault();
    const question = event.target.elements.question.value;

    // Split the user input into individual answers using commas as delimiters
    const answers = event.target.elements.answer.value.split(",").map((ans) => ({
      answer: ans.trim(),
      votes: 0
    }));

    const newPoll = { question: question, answers: answers };
    setPolls([...polls, newPoll]);


    event.target.reset();
  };

  const handleAnswerClick = (index, answerIndex) => {
      const newPolls = [...polls];
      newPolls[index].answers[answerIndex].votes += 1;
      setPolls(newPolls);

  };

  const handleDeletePoll = (index) => {
      const newPolls = [...polls];
      newPolls.splice(index, 1);
      setPolls(newPolls);

  };

  const handleTogglePolling = () => {
    setPopupVisible(prevState => !prevState);
    setToggleButtonText(prevState => prevState === 'Polls Toggle Off' ? 'Polls Toggle On' : 'Polls Toggle Off');
  };


  return (
    <div class="poll">
    {userRole == "Educator" ? (
    <>
    <h1>Create Polls</h1>
      <form onSubmit={handleSubmit}>
    
        <div class="poll-create">

            <div class="poll-ques-ans">
                <div class="poll-ques">
                    <label htmlFor="question">Question:</label>
                    <input type="text" id="question" name="question" required />
                </div>
                
                <div class="poll-ans">
                    <label htmlFor="answer">Answer:</label>
                    <input type="text" id="answer" name="answer" required />                 
                </div>
            </div>

             <button class="poll-create-submit" type="submit">Create Poll</button>
             <button class={`poll-toggle ${popupVisible ? 'on' : 'off'}`} onClick={handleTogglePolling} type = "button">{toggleButtonText}</button>

        </div>
      </form>

      </>
        ):null}

      {/* <h1>Active Polls</h1> */}
      <div class="poll-list">
      {userRole == "Educator" ? (
      <>
        {polls.map((poll, index) => (
        <div key={index}>

            <h1>
                <button class="poll-delete-btn" onClick={() => handleDeletePoll(index)}>[-]</button>
                <b>Q: {poll.question}</b>
            </h1>
            
            <div class="poll-ans-btn">
            {poll.answers.map((answer, answerIndex) => (

            <button onClick={() => handleAnswerClick(index, answerIndex)} key={answerIndex}>
              {answer.answer} ({answer.votes})
            </button>
            
            ))}
            </div>
        </div>
        ))}

        </>
        ):
        <>
        {popupVisible && (
        <div class="poll-popup">
        {polls.map((poll, index) => (
        <div key={index}>

            <h1>
                <b>Q: {poll.question}</b>
            </h1>
            
            <div class="poll-ans-btn">
            {poll.answers.map((answer, answerIndex) => (

            <button onClick={() => handleAnswerClick(index, answerIndex)} key={answerIndex}>
              {answer.answer} ({answer.votes})
            </button>
            
            ))}
            </div>
        </div>
        ))}
        </div>
        )}
        </>
        }
      </div>

    </div>
  );
};

export default Polls;
