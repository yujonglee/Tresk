import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTask } from '../redux_module/todoSlice';
import TitleField from './TitleField';

type TitleFieldContainerProps = {
  initialTitle?: string
};

const TitleFieldContainer = ({ initialTitle }: TitleFieldContainerProps): JSX.Element => {
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState(initialTitle || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value);
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
};

export default TitleFieldContainer;
