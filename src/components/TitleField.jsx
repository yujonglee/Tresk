import ActionButton from '../styled/ActionButton';

const TitleField = ({
  value, fieldName, buttonName,
  handleChange, handleClick,
}) => (
  <>
    <label htmlFor="input-task">
      {fieldName}
    </label>
    <input
      type="text"
      id="input-task"
      placeholder={fieldName}
      value={value}
      onChange={handleChange}
    />

    <ActionButton
      type="button"
      onClick={handleClick}
    >
      {buttonName}
    </ActionButton>
  </>
);

export default TitleField;
