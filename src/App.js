import React from 'react';
import './App.css';
import Form from './components/Form';
import Todo from './components/Todo';
import umaru from './components/umaru.png';

function App() {
  return (
    <div className="App">
      <h1 className='title'>Check List</h1>
      <Form />
      <Todo />
      <img className='umaru' src={umaru}/>
    </div>
  );
}

export default App;
