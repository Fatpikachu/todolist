import React, { useState, useEffect } from 'react'
import firebase from '../util/firebase';
import { collection, query, onSnapshot, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';

export default function Todo() {
  const [todos, setTodos] = useState('');
  const todoRef = collection(firebase, "Todos");

  useEffect(() => {

    // const getTodos = async() => {
    //    const todos = await getDocs(todoRef);
    //    setTodos(todos.docs.map((doc) => {
    //      console.log('>>>>',doc.data())
    //     return {
    //       ...doc.data(),
    //       id: doc.id
    //     }
    //    }))
    // }
    // getTodos()
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
      <div>  
        <span>{todo.title}</span>
        <span>{todo.completed.toString()}</span>
        <button onClick={() => {deleteTodo(todo.id)}}>Delete</button>
          {
          todo.completed ?
            <button onClick={() => {toggleFinish(todo.id, todo.completed)}}>Undone</button>
            :
            <button onClick={() => {toggleFinish(todo.id, todo.completed)}}>Done</button>
          }
      </div>
      ))
    }
   </div>
  )
}

