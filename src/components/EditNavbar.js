import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, Button, InputBase, List } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function EditNavbar() {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    setIsValidEmail(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
  }, [email]);




  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           <DescriptionIcon/> Document Name
          </Typography>
          <List>
            <Button color="inherit">Save</Button>
            <Button color="inherit">Download</Button>
            <Button onClick={handleClickOpen} color="inherit">
              Share
            </Button>
            <Button color="inherit">Print</Button>
            <Button color="inherit">Delete</Button>
          </List>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share Document</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To share this document, please enter an email address here.
          </DialogContentText>
          <TextField
          onChange={(e) => setEmail(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} disabled={!isValidEmail}>Share</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
