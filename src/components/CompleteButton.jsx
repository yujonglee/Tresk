import ActionButton from '../styled/ActionButton';

const CompleteButton = ({ handleClick }) => (
  <ActionButton
    type="button"
    onClick={handleClick}
  >
    완료
  </ActionButton>
);

export default CompleteButton;
