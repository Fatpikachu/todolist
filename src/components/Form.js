import React, {useState, useRef, useEffect} from 'react'
import firebase from '../util/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';


export default function Form() {
  const [title, setTitle] = useState('');
 
  const todoRef = collection(firebase, "Todos");

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  }

  // useEffect(() => {
  //   console.log('the firebase: ', firebase);
  // })
 
  const createTodo = () => {
    addDoc(todoRef, { title, completed: false, createdAt: Timestamp.fromDate(new Date()) });
  }

  return (
    <div>
      <input type='text' placeholder='Add a new task' onChange={handleOnChange} value={title}/>
      <button onClick={createTodo}>Add Todo</button>
    </div>
  )
}
