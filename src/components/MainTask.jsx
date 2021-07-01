import TaskButtonContainer from './TaskButtonContainer';
import TaskTitleContainer from './TaskTitleContainer';

const MainTask = ({ id }) => (
  <>
    <TaskTitleContainer id={id} />
    <TaskButtonContainer id={id} />
  </>
);

export default MainTask;
