import React from 'react';
import './App.css';
import firebase from './util/firebase';
import Form from './components/Form';
import Todo from './components/Todo';

function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
      <Form />
      <Todo />
    </div>
  );
}

export default App;
