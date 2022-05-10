import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Todo({id, title, completed, deleteTodo, toggleFinish, editTodo}) {
  const todoRef = useRef('');
  const [todoName, setTodoName] = useState(title);
  const [disable, setDisable] = useState(true);
  const [height, setHeight] = useState(0);

  const enableTodo = () => {
    todoRef.current.focus();
    setDisable(false);
    todoRef.current.selectionStart = todoRef.current.value.length;
    todoRef.current.selectionEnd = todoRef.current.value.length;
  }

  const saveTodo = () => {
    setDisable(true);
    editTodo(id, todoName);
  }

  const handleOnChange = (e) => {
    setTodoName(e.target.value);
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`; 
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setDisable(true);
      editTodo(id, todoName);
    }
  }

  useEffect(() => {
    !disable && todoRef.current.focus();
    setHeight(todoRef.current.scrollHeight);
}, [disable, height])

  return (
      <div className='todo_container'>  
        <textarea ref={todoRef} 
            onBlur={saveTodo} 
            onChange={(e) => {handleOnChange(e)}} 
            className={completed ? 'todo todo_complete' : 'todo'} 
            value={todoName} 
            disabled={disable}
            onKeyUp={handleKeyPress}
            style={{height: height}}
            />
        <div className='todo_buttons'>
          <input type="checkbox" 
              checked={completed} 
              onChange={() => {toggleFinish(id, completed)}} 
          />
          <button className='edit_button' 
            onClick={() => {enableTodo(id)}}>
            <FontAwesomeIcon className='edit_icon' icon={faEdit} />
          </button>
          <button className='delete_button' 
            onClick={() => {deleteTodo(id)}}>
            <FontAwesomeIcon className='trash_can' icon={faTrashCan} />
          </button>
          </div>
      </div>
  )
}

