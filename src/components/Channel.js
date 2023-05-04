import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import Message from './Message';

const Channel = ({ user = null, db = null, haveSelectedCourse, selectedCourseValue}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const{ uid, displayName, photoURL } = user;


    useEffect(() => {
        if (db){
            const messageList = db
            .collection('messages')
            .orderBy('createdAt','desc') /*Sort by descending created At*/
            .limit(100)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setMessages(data);
            })
            
            return messageList;
        }
    }, [db]);


    const handleonChange = e => {
        setNewMessage(e.target.value);
    };

    const handleOnSubmit = async(e) => {
        e.preventDefault();

        if (!haveSelectedCourse){
            window.alert('Please select a course before proceeding!')
            return
        }
        //Updates database
        if (db){
            db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }

        setNewMessage('');

        //API Request
        const response = await fetch(process.env.REACT_APP_URL + '/submit-message', {
            method: 'POST',
            headers: {
              'Content-Type':'application/json',
            },
            body: JSON.stringify({
              message: newMessage,
              user: displayName,
            }),
          });
          if (response.ok) {
            console.log('API request sent successfully');
            const responsePacket = await response.json();
            console.log("new object", {responsePacket})
            // const responseContent=responsePacket.content;
            // console.log('Response Content: ', responseContent);


                /*If there is a response, it is a question, update to question database*/
                if (responsePacket.filename !== null) {

                    const url = '${process.env.REACT_APP_API_URL}/' + responsePacket.filename
                    const audio  = new Audio(url)
                        
                    audio.addEventListener('ended', () => audio.pause())
                    audio.play()
                }
                if (responsePacket.content !== null) {
                    db.collection('questions').add({
                    question: responsePacket.content,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    uid,
                    displayName,
                    photoURL,
                    upvotes:0,
                    course: selectedCourseValue,
                    });
                }
            
          } else {
            console.error('API request failed');
          }
        

    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <input class="input-bar"
                    value={newMessage}
                    onChange={handleonChange}
                    placeholder="Type your message here..."            
                />
                <button class="send-btn" type="submit" disabled={!newMessage}>
                    Send
                </button>
                
            </form>
            <ul class="message-list">
                {messages.map(message => (
                    <li key ={message.id}>
                        <Message {...message} />
                    </li>
            ))}
            </ul>

        </>
    );
};

export default Channel;