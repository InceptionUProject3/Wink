import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import moment from "moment";
import React from "react";

const DeleteConfirmModal = ({
  confirmModalOpen,
  setConfirmModalOpen,
  selectedSched,
  setSchedModalOpen,
  employeeSched,
  timezone,
}) => {
  const sendDelete = async () => {
    console.log("Archiving schedule");

    const pretendDelete = {
      ...selectedSched,
      archived: true,
    };

    const dataToSend = JSON.stringify(pretendDelete);
    const response = await fetch(`/api/schedule/scheduling`, {
      method: "PATCH",
      headers: { "content-Type": "application/json" },
      body: dataToSend,
    });
    if (response.status === 200) {
      console.log(await response.json());
    }
    setSchedModalOpen((pre) => !pre);
    setConfirmModalOpen(false);
  };

  return (
    <Dialog
      open={confirmModalOpen}
      onClose={() => setConfirmModalOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirm delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete schedule for{" "}
          {employeeSched?.firstname}, {employeeSched?.lastname} on{" "}
          {moment.tz(selectedSched?.starttime, timezone).format("MMM Do")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmModalOpen(false)}>Cancel</Button>
        <Button onClick={sendDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmModal;
