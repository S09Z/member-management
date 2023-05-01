// components/DeleteConfirmationDialog.tsx
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { User } from '../types';

type Props = {
  user: User;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteConfirmationDialog = ({ user, open, onClose, onConfirm }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the user "{user.name}" (ID: {user.id})?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
