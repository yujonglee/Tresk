import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTask, toggleLogBookOpen } from '../redux_module/todoSlice';
import TitleField from './TitleField';

export default function TitleFieldContainer({ initialTitle }) {
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState(initialTitle || '');

  const handleFocus = () => dispatch(toggleLogBookOpen(false));
  const handleChange = (e) => setTaskTitle(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(addTask(taskTitle));
      setTaskTitle('');
    }
  };
  const handleClick = () => {
    dispatch(addTask(taskTitle));
    setTaskTitle('');
  };

  return (
    <TitleField
      value={taskTitle}
      fieldName="할 일"
      handleFocus={handleFocus}
      handleClick={handleClick}
      handleChange={handleChange}
      handleKeyDown={handleKeyDown}
    />
  );
}
