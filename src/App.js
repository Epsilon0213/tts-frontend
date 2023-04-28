import Button from './components/Button';
import Channel from './components/Channel';
import Effect from './components/Effect';
import Phrase from './components/Phrase';
import VoiceSelection from './components/VoiceSelection';
import Polls from './components/Polls';
import MusicPlayer from './components/MusicPlayer';
import CourseSelection from './components/CourseSelection';
import QuestionList from './components/QuestionList';
import TTSModelSelection from './components/TTSModelSelection';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useEffect, useState } from 'react';
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';//Firebase deps

// https://www.youtube.com/watch?v=2-LISBTczQE&ab_channel=AlterClass


firebase.initializeApp({
  apiKey: "AIzaSyA4gPt764UcUcSYVMcgmsp9Iql3aSn47HU",
  authDomain: "chatapp-47dc2.firebaseapp.com",
  // databaseURL: "https://chatapp-47dc2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatapp-47dc2",
  storageBucket: "chatapp-47dc2.appspot.com",
  messagingSenderId: "901126087641",
  appId: "1:901126087641:web:27eabac34532a2305defc8",
  measurementId: "G-8ZYREJ310E",
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(false);
  const [courseValue, setCourseValue] = useState("")
  const [openPanel, setOpenPanel] = useState(false);
  const [role, setRole] = useState('');
  

  useEffect(() =>{
    const logIn = auth.onAuthStateChanged(user => {
      if (user){
        setUser(user);
      }else {
        setUser(null);
      }
      if (initializing){
        setInitializing(false);
      }
      });

      return logIn;
  },[]);


  const signInWithGoogle = async() =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    
    try{
      await auth.signInWithPopup(provider);
    } catch (error){
      console.error(error);
    }
  };

  const signOut = async () =>{
    try{
      await firebase.auth().signOut();
    }catch(error){
      console.log(error.message);
    }
  };

  /*Check if user has selected course. If yes, true. Else, false.*/
  const handleCourseSelect = (value) => {
    setSelectedCourse(value !== 'default');
    setCourseValue(value);
    console.log("User selected course:", value);
  };

  /*Logs courseValue everytime it changes*/
  useEffect(() => {
    console.log(courseValue);
  }, [courseValue]);


  if (initializing) return "Loading...";

  const handleDeleteMessages = () => {
    db.collection('messages').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  };

  const handleDeleteQuestions = () => {
    db.collection('questions').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };


  return (
    <div> 
      {user ? (
        <>
        <div class = "content-container">
          <div class = "guidebox-left">
            
            <p class="title">TTS Engine Protoype</p>
            <h2>This is the beginning of this chat. You are signed in as <u>{user.displayName}</u> ({role}). Select your course before proceeding!</h2>
            <CourseSelection onCourseSelect={handleCourseSelect}/>
            <div class="button-grid">
              <Button onClick={signOut}>👋🏻 Sign Out</Button>
              {/* add delete button */}

              {role == "Educator" ? (
              <>
              <Button onClick={handleDeleteMessages}>❌ Delete Messages</Button> 
              </>
             ):null}

            {/* <div class="role-select-wrapper">
              <h2>I am a</h2>
              <form class="role-select">
                <select id="role-select" value={role} onChange={handleRoleChange} required>
                  <option value="Student">Student</option>
                  <option value="Educator">Educator</option>
                </select>
              </form>
            </div> */}

            </div>
            <h1>Model Selection</h1>
            <h2>This is only relevant for /talk command. Please select the voice and your corresponding model speed/quality on the right.</h2>
            <div class="select-flex-container">
              <VoiceSelection/>
              <TTSModelSelection/>
            </div>

            <div class="info-area">
              <h1>Available Commands</h1>
              <h2>Use our commands to interact with your native conferencing app! Works well with Zoom, Meets, Discord, etc...</h2>
              <ul>
                <li>
                  <p>
                  <h3>"/talk text"</h3>
                  <h4>Activates TTS function. Bot will speak content of text.<br></br>
                  E.g. /talk Today is a beautiful day.</h4>
                  </p>
                </li>

                <li>
                  <p>
                  <h3>"/ques question"</h3>
                  <h4>Adds to list of question for storage.<br></br>
                  E.g. /ques What is a transistor?</h4>
                  </p>
                </li>

              </ul>
            </div>

            <div class="effects-area">
              <h1>Sound Effects</h1>
              <h2>Click on the sound effects and our bot will speak recreate them!</h2>
              <div class="button-grid">
                <Effect effect="ping">🛎️ Ping</Effect>
                <Effect effect="clapping">👏🏻 Clapping</Effect>
                <Effect effect="trombone">🎺 Trombone</Effect>
                <Effect effect="gasp">👀 Gasp</Effect>
               </div>
            </div>

            <div class="phrases-area">
              <h1>Commonly Used Phrases</h1>
              <h2>Click on each intent and our bot will speak it out loud for you!</h2>
              <div class="button-grid">
                <Phrase effect="ask-question">❓ Ask A Question</Phrase>
                <Phrase effect="thank">🙏 Thanks!</Phrase>
                <Phrase effect="request-reexplain">💭 Request for Elaboration</Phrase>
                <Phrase effect="request-repeat">🔄 Request for Repeat</Phrase>
               </div>
            </div>


            <div class="music-area">
              {role == "Educator" ? (
                <>
              <h1>Play Music</h1>
              <h2>Relaxing music for break time :)</h2>
              <MusicPlayer/>
              {/* <Music music="forest">🌲 Forest</Music>
              <Music music="lofi">🎧 Lofi-Chill</Music> */}
              </>
             ):null}
            </div>

          
          
          </div>

          <div class="contentbox-right">
            <button class="panel-open-btn" onClick={() => setOpenPanel(true)}>&lt;&lt;</button>

            <SlidingPanel
              type='right'
              isOpen={openPanel}
              size={40}
              >

            <div class="questions-panel">
              <button id="question-panel-close-btn" onClick={() => setOpenPanel(false)}>X</button>
              <h1>Questions Compilation</h1>

              <div class="button-grid">
              {role == "Educator" ? (
                <>
                <button class="btn" id="delete-ques-btn" onClick={handleDeleteQuestions}>❌ Delete All Questions</button>
                </>
              ):null}
              </div>


              <QuestionList db={db} user={user} userRole = {role} selectedCourseValue={courseValue}/>
            </div>

            </SlidingPanel>    
               
            <Polls userRole = {role} user={user}/>
            <Channel user={user} db={db} haveSelectedCourse={selectedCourse} selectedCourseValue={courseValue} />
          </div>


          
        </div>

  

        </>
      ) : (
        <>
        <header>
        <h1>TTS Engine Protoype</h1>
        <h2>Welcome! Please sign in using your Google Account to interact with the engine.</h2>
        <div class="role-select-wrapper">
          <h2>I am a</h2>
          <form class="role-select">
            <select id="role-select" value={role} onChange={handleRoleChange} required>
              <option value="Student">Student</option>
              <option value="Educator">Educator</option>
            </select>
          </form>
        </div>

        <div class="button-grid">
          <Button type="submit" onClick={signInWithGoogle}>Sign in with Google</Button>
        </div>
      
        </header>
        </>
      )}
    </div>
  );
}

export default App;
