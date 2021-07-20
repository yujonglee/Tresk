import { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';

import ManualContent from './ManualContent';

export default function Manual() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton
        aria-label="manualOpener"
        variant="outlined"
        color="default"
        onClick={handleClick}
      >
        <HelpOutline />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClick}
        maxWidth="sm"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          처음 사용하시나요?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            어렵지 않아요. 금방 배울 거에요.
          </DialogContentText>
          <ManualContent />
        </DialogContent>
      </Dialog>
    </>
  );
}
