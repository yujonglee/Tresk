import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { original } from '../color';
import RestoreTaskButton from './RestoreTaskButton';

const DeletedItem = styled.li({
  fontSize: '1.5em',
  textDecoration: 'line-through',
  color: original,
  '&:hover': {
    fontWeight: 'bold',
  },
});

export default function LogBook() {
  const deletedTasks = useSelector((state) => state.todo.recentDeleted);

  return (
    <ul>
      {deletedTasks.map(({ task, selfId }) => (
        <div key={selfId}>
          <DeletedItem>
            {task.title}
            <RestoreTaskButton id={selfId} />
          </DeletedItem>
        </div>
      ))}
    </ul>
  );
}
