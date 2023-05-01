// components/ConfirmationDialog.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
};

export const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
