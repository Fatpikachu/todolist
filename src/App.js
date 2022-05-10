import React from 'react';
import './App.css';
import Form from './components/Form';
import TodoContainer from './components/TodoContainer';
import umaru from './components/umaru.png';

function App() {
  return (
      <div className="App">
        <h1 className='title'>Check List</h1>
        <Form />
        <TodoContainer />
        <img className='umaru' src={umaru}/>
      </div>
  );
}

export default App;
