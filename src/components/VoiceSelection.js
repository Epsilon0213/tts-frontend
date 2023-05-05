import React, { useState } from 'react';

const VoiceSelection = () => {
  const [selectedVoice, setSelectedVoice] = useState('morgan-freeman');

  const handleVoiceChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedVoice(selectedValue);

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/voice-select', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `/voice_select ${selectedValue}`,
          user: 'userDisplayName', // Replace with user's display name
        }),
      });

      if (response.ok) {
        console.log(`Selected voice: ${selectedValue}`);
      } else {
        console.error(`Failed to select voice ${selectedValue}.`);
      }
    } catch (error) {
      console.error(`Error selecting voice ${selectedValue}: ${error}`);
    }
  };

  return (
    <form class="model-select">
      <label htmlFor="model-select"><b>Voice: </b></label>
      <select id="model-select" value={selectedVoice} onChange={handleVoiceChange}>
        <option value="morgan-freeman">Morgan Freeman</option>
        <option value="david-attenborough">Sir David Attenborough</option>
        <option value="ellen-degeneres">Ellen Degeneres</option>
      </select>
    </form>
  );
};

export default VoiceSelection;
