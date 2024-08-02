// src/ModalComponent.js
import React from 'react';
import Modal from 'react-modal';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

Modal.setAppElement('#root');

const ModalComponent = ({ isOpen, onRequestClose, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
    >
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onRequestClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalComponent;
