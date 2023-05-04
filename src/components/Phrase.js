import React from 'react';

const Phrase = ({effect: phrase = null, children = null}) => {

  const handlePhraseClick = async () => {
    const response = await fetch(process.env.REACT_APP_URL + '/submit-message', {
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
    } else {
      console.error(`Failed to trigger "${phrase}" effect`);
    }
  }

  return (
    <button onClick={handlePhraseClick} class="btn">{children}</button>
  );
}

export default Phrase;