import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import Question from './Question';
import { FaArrowUp, FaBullhorn, FaTimes } from 'react-icons/fa';


const QuestionList = ({ db = null, user = null, userRole, selectedCourseValue}) => {
  const [questions, setQuestions] = useState(null);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const{ uid, displayName, photoURL } = user;

  useEffect(() => {
    if (db){
        const questionList = db
        .collection('questions')
        .where('course', '==', selectedCourseValue) // filter by "course"
        .orderBy('upvotes','desc') /*Sort by descending created At*/
        .orderBy('createdAt', 'desc')
        .limit(100)
        .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            setQuestions(data);

            const count = data.reduce((acc, curr) => {
              acc[curr.id] = curr.upvotes;
              return acc;
            }, {});
            setUpvoteCount(count);
        });
        
        return questionList;
    }
}, [db]);

  const handleUpvote = async(e, id) => {
    e.preventDefault();

    if (db){
        db.collection('questions').doc(id).update({ 
          upvotes: firebase.firestore.FieldValue.increment(1),
        });
        setUpvoteCount(upvoteCount + 1);
  
    }
  };

  const handleQuestionSpeak = async(e, message) => {
    e.preventDefault();

    const newMessage = "/talk " + message;

    //API Request
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/submit-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage,
          user: displayName,
        }),
      });
      if (response.ok) {
        console.log('API request sent successfully');

      } else {
        console.error('API request failed');
      }
  }

  const handleDeleteSingleQuestion = async(e, id) => {
    e.preventDefault();

    if (db){
      db.collection('questions').doc(id).delete({ 
      });
  }
  };

  if (!questions) return;

  return (
    <div>
      {questions ? (
        /*Pass all props of question into Question*/
        <ul className="question-list">
          {questions.map(question => (
            <li key={question.id}> 
              
              <div class="question-flex-container">

                <Question class="question" {...question}/> 
              
                <div class="upvote-flex-container">

                <div class="question-btn-container">

                  {userRole == "Educator" ? (
                  <>
                  <button class="question-btn" title="Remove question" onClick={(e) => handleDeleteSingleQuestion(e, question.id)}>
                    <FaTimes size={20} />
                  </button>
                  </>
                  ):null}

                  <button class="question-btn" title="Speak question" onClick={(e) => handleQuestionSpeak(e, question.question)}>
                    <FaBullhorn size={20} />
                  </button>
                  <button class="question-btn" title="Upvote this question" onClick={(e) => handleUpvote(e, question.id)}>
                  <FaArrowUp size={20} />
                  </button>
                </div>

                  <h1>{upvoteCount[question.id]}</h1>
                </div>

              </div>
            </li>
          ))}
        </ul>

      ):(
        <p class="no-ques-text">🐦 This is awkward...There has been no questions yet!</p>
      )}

    </div>


  );
};

export default QuestionList;