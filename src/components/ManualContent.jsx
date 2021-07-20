import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
  AddRounded,
  BookRounded,
  RotateLeftRounded,
  UndoRounded,
  HelpOutline,
} from '@material-ui/icons';
import { useState } from 'react';

export default function ManualContent() {
  const [value, setValue] = useState('help');

  const handleChange = (e, nextValue) => {
    setValue(nextValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction label="Add" value="add" icon={<AddRounded />} />
      <BottomNavigationAction label="Restore" value="restore" icon={<UndoRounded />} />
      <BottomNavigationAction label="LogBook" value="logbook" icon={<BookRounded />} />
      <BottomNavigationAction label="Reset" value="reset" icon={<RotateLeftRounded />} />
      <BottomNavigationAction label="Help" value="help" icon={<HelpOutline />} />
    </BottomNavigation>
  );
}
