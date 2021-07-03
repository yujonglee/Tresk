import ActionButton from '../styled/ActionButton';

export default function CompleteButton({ handleClick }) {
  return (
    <ActionButton
      type="button"
      onClick={handleClick}
    >
      완료
    </ActionButton>
  );
}
