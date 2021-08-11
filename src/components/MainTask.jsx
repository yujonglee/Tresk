import SelectButton from './SelectButton';
import TaskButtonContainer from './TaskButtonContainer';
import TaskTitleContainer from './TaskTitleContainer';

export default function MainTask({ id }) {
  return (
    <>
      <SelectButton id={id} />
      <TaskTitleContainer id={id} />
      <TaskButtonContainer id={id} />
    </>
  );
}
