import React, { useState } from 'react';

const TTSModelSelection = () => {
  const [selectedModel, setSelectedModel] = useState('instant');

  const handleModelChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedModel(selectedValue);

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/model-select', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `/model_select ${selectedValue}`,
          user: 'userDisplayName', // Replace with user's display name
        }),
      });

      if (response.ok) {
        console.log(`Selected model: ${selectedValue}`);
      } else {
        console.error(`Failed to select model ${selectedValue}.`);
      }
    } catch (error) {
      console.error(`Error selecting model ${selectedValue}: ${error}`);
    }
  };

  return (
    <form class="model-select">
      {/* <label htmlFor="model-select">Model:</label> */}
      <select id="model-select" value={selectedModel} onChange={handleModelChange}>
        <option value="robotic">Robotic</option>
        <option value="simple_clone">Simple Cloning</option>
        <option value="ai_clone">AI Cloning (~60s)</option>
        <option value="commercial">Commercial Cloning</option>
      </select>
    </form>
  );
};

export default TTSModelSelection;
