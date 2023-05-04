import React from 'react';

const Effect = ({effect = null, children = null}) => {

  const handleEffectClick = async () => {
    // Sends API
    const response = await fetch(process.env.REACT_APP_URL + '/submit-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `/sound_effect ${effect}`,
        user: 'userDisplayName', // Replace with user's display name
      }),
    });
    if (response.ok) {
      console.log(`"${effect}" effect triggered successfully`);
    } else {
      console.error(`Failed to trigger "${effect}" effect`);
    }
  }

  return (
    <button onClick={handleEffectClick} class="btn">{children}</button>
  );
}

export default Effect;