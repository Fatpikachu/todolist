import React, { useState, useEffect } from 'react'
import firebase from '../util/firebase';
import { collection, query, onSnapshot, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function Todo() {
  const [todos, setTodos] = useState('');
  const todoRef = collection(firebase, "Todos");

  useEffect(() => {
    onSnapshot(query(todoRef, orderBy("createdAt")), (snapshot) => {
      setTodos(snapshot.docs.map((doc) => {
               console.log('>>>>',doc.data())
              return {
                ...doc.data(),
                id: doc.id
              }
      }))
    })
  }, [])

  const deleteTodo = (id) => {
    const task = doc(firebase, 'Todos', id);
    deleteDoc(task);
  }

  const toggleFinish = (id, finish) => {
    const task = doc(firebase, 'Todos', id);
    updateDoc(task, {completed: !finish});

  }

  return (
    <div className='list_container'>
    {
      todos && todos.map((todo) => (
      <div className='todo_container'>  
        <span className={todo.completed ? 'todo todo_complete' : 'todo'}>{todo.title}</span>
        <div className='todo_buttons'>
          <input type="checkbox" defaultChecked={todo.completed} onClick={() => {toggleFinish(todo.id, todo.completed)}}/>
          <button className='delete_button' onClick={() => {deleteTodo(todo.id)}}><FontAwesomeIcon className='trash_can' icon={faTrashCan} /></button>
          </div>
      </div>
      ))
    }
   </div>
  )
}

