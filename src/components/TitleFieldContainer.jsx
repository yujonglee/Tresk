import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTask } from '../redux_module/todoSlice';
import TitleField from './TitleField';

export default function TitleFieldContainer({ initialTitle }) {
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState(initialTitle || '');

  const handleChange = (e) => setTaskTitle(e.target.value);
  const handleClick = () => {
    dispatch(addTask(taskTitle));
    setTaskTitle('');
  };

  return (
    <TitleField
      value={taskTitle}
      fieldName="할 일"
      buttonName="추가"
      handleClick={handleClick}
      handleChange={handleChange}
    />
  );
}
