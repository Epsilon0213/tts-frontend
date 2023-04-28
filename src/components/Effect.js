import React from 'react';

const Effect = ({effect = null, children = null}) => {

  const handleEffectClick = async () => {
    // Sends API
    const response = await fetch('http://127.0.0.1:105/submit-message', {
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