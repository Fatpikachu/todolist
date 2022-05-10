import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import firebase from '../util/firebase';
import { collection, query, onSnapshot, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';

export default function TodoContainer() {
  const todoList = collection(firebase, "Todos");
  const [todos, setTodos] = useState('');

  useEffect(() => {
    onSnapshot(query(todoList, orderBy("createdAt")), (snapshot) => {
      setTodos(snapshot.docs.map((doc) => {
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

  const editTodo = (id, newTitle) => {
    const task = doc(firebase, 'Todos', id);
    updateDoc(task, {title: newTitle});
  }

  return (
    <div className='todo_list'>
      {
      todos && todos.map((todo) => {
        const { id, title, completed } = todo;
        return <Todo 
                    key={id}
                    id={id} 
                    title={title} 
                    completed={completed} 
                    deleteTodo={deleteTodo} 
                    toggleFinish={toggleFinish} 
                    editTodo={editTodo} />
      })
      }
    </div>
  )
}

