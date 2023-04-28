import React from 'react';
import { useEffect, useState } from 'react';




const Music = ({music = null, children = null}) => {

const [isOn, setIsOn] = useState(false);

  const handleEffectClick = async () => {

    let state;
    if (!isOn) {
        state = 'on';
        setIsOn(true);
      } else {
        state = 'off';
        setIsOn(false);
    }
    
    const response = await fetch('http://127.0.0.1:105/music-player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `/music_` + state + ` ` + `${music}`,
        user: 'userDisplayName', // Replace with user's display name
        music_state: state,
      }),
    });
    if (response.ok) {
      console.log(`"Playing ${music} music now".`);
    } else {
      console.error(`Failed to play "${music}" music.`);
    }
  }

  return (
    <button onClick={handleEffectClick} class={`btn ${isOn ? 'on' : 'off'}`}>{children}</button>
  );
}

export default Music;