import React from 'react';

const Phrase = ({effect: phrase = null, children = null}) => {

  const handlePhraseClick = async () => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/submit-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `/speak_phrase ${phrase}`,
        user: 'userDisplayName', // Replace with user's display name
      }),
    });
    if (response.ok) {
      console.log(`"${phrase}" effect triggered successfully`);
      const responsePacket = await response.json();
      console.log("new object", {responsePacket})
      // const responseContent=responsePacket.content;
      // console.log('Response Content: ', responseContent);


          /*If there is a response, it is a question, update to question database*/
          if (responsePacket.filename !== null) {

              const url = `${process.env.REACT_APP_STATIC_URL}/sounds/phrases/${responsePacket.filename[1][4]}`
              const audio  = new Audio(url)
                  
              audio.addEventListener('ended', () => audio.pause())
              audio.play()
          }
    } else {
      console.error(`Failed to trigger "${phrase}" effect`);
    }
  }

  return (
    <button onClick={handlePhraseClick} class="btn">{children}</button>
  );
}

export default Phrase;