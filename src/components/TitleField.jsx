import ActionButton from '../styled/ActionButton';

export default function TitleField({
  value, fieldName, buttonName,
  handleChange, handleClick,
}) {
  return (
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
}
