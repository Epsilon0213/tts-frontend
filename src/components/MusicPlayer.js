import React, { useState } from 'react';
import Music from './Music';

const MusicPlayer = () => {
  const [musicState, setMusicState] = useState({
    player: false,
    forest: false,
    lofi: false,
  });

  const handleMusicClick = (musicName) => {

    if (!musicState.player){
        setMusicState((prevState) => ({ ...prevState, player: true, [musicName]:true}));
    } else{
    
    }

  };

  return (
    <>
    <div class="button-grid">
      <Music music="forest" isOn={musicState.forest} onClick={handleMusicClick('forest')}>
        🌲 Forest
      </Music>
      <Music music="lofi" isOn={musicState.lofi} onClick={handleMusicClick('lofi')}>
        🎧 Lofi-Chill
      </Music>
    </div>
    </>
  );
};

export default MusicPlayer;
