import React, {useState, useRef, useEffect} from 'react'
import firebase from '../util/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';


export default function Form() {
  const [title, setTitle] = useState('');
 
  const todoRef = collection(firebase, "Todos");

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  }
 
  const createTodo = () => {
    addDoc(todoRef, { title, completed: false, createdAt: Timestamp.fromDate(new Date()) });
    setTitle('');
  }

  return (
    <div className='form'>
      <input type='text' placeholder='Add a new task' onChange={handleOnChange} value={title}/>
      <span className='add_button' onClick={createTodo}><a></a></span>
    </div>
  )
}
