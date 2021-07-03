import TaskButtonContainer from './TaskButtonContainer';
import TaskTitleContainer from './TaskTitleContainer';

export default function MainTask({ id }) {
  return (
    <>
      <TaskTitleContainer id={id} />
      <TaskButtonContainer id={id} />
    </>
  );
}
