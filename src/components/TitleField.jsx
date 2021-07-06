import { IconButton, TextField } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';

export default function TitleField({
  value, fieldName,
  handleChange, handleClick,
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
        fullWidth
        margin="normal"
      />

      <IconButton
        type="button"
        variant="contained"
        color="default"
        size="small"
        aria-label="add"
        onClick={handleClick}
      >
        <AddRounded />
      </IconButton>
    </>
  );
}
