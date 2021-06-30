import { ChangeEventHandler, MouseEventHandler } from 'react';

import ActionButton from '../styled/ActionButton';

type InputProps = {
  value: string
  fieldName: string
  buttonName: string
  handleChange: ChangeEventHandler<HTMLInputElement>
  handleClick: MouseEventHandler<HTMLButtonElement>
};

const Input = ({
  value, fieldName, buttonName, handleChange, handleClick,
}: InputProps): JSX.Element => (
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

export default Input;
