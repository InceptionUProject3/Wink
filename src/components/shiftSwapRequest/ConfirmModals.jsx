import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { MessageContext } from "../messaging/MessageContext";
import { StoreContext } from "../authentication/StoreProvider";
import { useContext } from "react";


const ConfirmModals = (props) => {
  const { request, setOpenModal } = props;
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState();
  const socket = useContext(MessageContext).socketRef;
  const user = useContext(StoreContext).store;

  const submitAction = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = JSON.stringify(request);
      console.log('request to send', dataToSend)
      const response = await fetch(`/api/swapShift/swapShiftRequest`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: dataToSend,
      });

      if (response.status === 200) {
        socket.emit("findStoreAdmins", dataToSend);
        let messageData = JSON.parse(dataToSend);
        socket.on("storeAdmins", (data) => {
          // console.log("storeAdmins", data);
          const admins = data.map((admin) => {
            return admin.User_idUser})
            console.log("admins", admins)
            console.log(messageData)
             const shiftMessage = {
          sender: messageData.userId,
          receiver: admins,
          chat: "New time off request for " + messageData.date + ": " + messageData.reason,
          user_id: messageData.userId,
          user_privilages: 1002,
          msg_timeStamp: new Date(),
          store: messageData.storeId,
          read_receits: false,
        }
        console.log("shiftMessage", shiftMessage)
        socket.emit("shiftSwapMessage", shiftMessage);
        let notify = {
          user: admins,
          store: messageData.storeId,
        }
        console.log("sending notification", notify);
        socket.emit("notify", notify);

        });


        // const shiftMessage = {
        //   sender: dataToSend.userID,
        //   receiver: req.body.receiver,
        //   chat: dataToSend.reason,
        //   user_id: dataToSend.userID,
        //   user_privilages: 1002,
        //   msg_timeStamp: new Date(),
        //   store: dataToSend.storeId,
        //   read_receits: false,
        // }
        console.log("Succeed to submit your request", user);
        // socket.emit("shiftswap", request);

        setConfirmModalOpen(false);
        setSuccessModalOpen(true);
      }
    } catch (err) {
      console.log("Failed to submit your request");
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
  
  const successClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="Modal">
      <button className="Request-btn" onClick={buttonOnclick}>
        Send request
      </button>
      <div className="Message">{message && message}</div>
      <Dialog
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='md'
      >
        <DialogTitle id="alert-dialog-title">Confirm your request</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your shift swap request will be sent for <b>{request.date}</b>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmModalOpen(false)}>Cancel</Button>
          <Button onClick={submitAction} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='md'
      >
        <DialogTitle id="alert-dialog-title">Success</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your request has been sent. You can check your request status in
            messenger.
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
