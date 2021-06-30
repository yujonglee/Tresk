import TaskButtonContainer from './TaskButtonContainer';
import TaskTitleContainer from './TaskTitleContainer';

type MainTaskProps = {
  id: number
};

const MainTask = ({ id }: MainTaskProps): JSX.Element => {
  const isRootTask = (id === 0);

  if (isRootTask) {
    return <></>;
  }

  return (
    <>
      <TaskTitleContainer id={id} />
      <TaskButtonContainer id={id} />
    </>
  );
};

export default MainTask;
