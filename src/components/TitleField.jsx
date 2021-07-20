import { TextField } from '@material-ui/core';

export default function TitleField({
  value, fieldName,
  handleFocus, handleChange, handleKeyDown,
}) {
  return (
    <>
      <label
        htmlFor="input-task"
        style={{ display: 'none' }}
      >
        {fieldName}
      </label>
      <TextField
        type="text"
        id="input-task"
        placeholder={fieldName}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        fullWidth
        margin="normal"
      />
    </>
  );
}
