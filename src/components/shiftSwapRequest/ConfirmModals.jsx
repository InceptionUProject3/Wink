import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";

const ConfirmModals = (props) => {
  const { request, setOpenModal } = props;
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState();
  
  const submitAction = async (e) => {
    e.preventDefault();

    const dataToSend = JSON.stringify(request);
    const response = await fetch(`/api/swapShift/swapShiftRequest`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: dataToSend,
    });
    
    if (response.status === 200) {
      console.log("success");

     
      setConfirmModalOpen(false);
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
    
    setConfirmModalOpen(true);
  };
const successClose=()=>{
    setOpenModal(false);

}
  return (
    <div className="Modal">
      <button className='Request-btn' onClick={buttonOnclick}>Send request</button>
      <div className="Message">{message && message}</div>
      <Dialog
        open={confirmModalOpen}
        onClose={()=>setConfirmModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm your request</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your shift swap request will be sent for <b>{request.date}</b>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setConfirmModalOpen(false)}>Cancel</Button>
          <Button onClick={submitAction} autoFocus>
            Confirm
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
          Your request has been sent. You can check request status in ___
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={successClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmModals;
