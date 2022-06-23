import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";

const ConfirmModal = (props) => {
  const { request, setOpenModal } = props;
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState();
  const handleClickOpen = () => {
    setConfirmModalOpen(true);
  };
  const handleClose = () => {
    setConfirmModalOpen(false);
  };
  const submitAction = async (e) => {
    e.preventDefault();

    const dataToSend = JSON.stringify(request);
    const response = await fetch(`/api/schedule/shiftswap`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: dataToSend,
    });
    if (response.status === 200) {
      console.log("success");

     
      handleClose();
      setSuccessModalOpen(true)
    }
  };
  const buttonOnclick = (e) => {
    if (!request.date) {
      return setMessage("Date is required");
    }
    if (!request.reason) {
      return setMessage("Reason is required");
    }
    
    handleClickOpen();
  };
const successClose=()=>{
    setOpenModal(false);

}
  return (
    <div>
      <button onClick={buttonOnclick}>Send request</button>
      {message && <div>{message}</div>}
      <Dialog
        open={confirmModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm your request</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Swapping schedule on {request.date}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={submitAction} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={successModalOpen}
        onClose={()=>setSuccessModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Success</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Your requests has been sent. You can check your request status in ___
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={successClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
