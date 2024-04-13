import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, Button, InputBase, List } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import { useParams } from "react-router-dom";
import axios from "axios";
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


  const [fileName, setFileName] = useState("");

  const [open, setOpen] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const {id} = useParams();

  const files = JSON.parse(localStorage.getItem("files"));

  const [isOwner, setIsOwner] = useState(false);

  const deleteDocument = () => {
    axios
      .delete(`http://localhost:8080/file/delete/${id}`)
      .then((response) => {
        console.log(response);
        if(response.status === 200){
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }



  useEffect(() => {
    setIsOwner(files.find((file) => file.fileID === id && file.role === "OWNER") !== undefined);
    axios
      .get(`http://localhost:8080/file/${id}`)
      .then((response) => {
        console.log(response.data);
        setFileName(response.data.fileName);

      })
      .catch((error) => {
        console.log(error);
      }); 
  }, []);

  return (
    
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           <DescriptionIcon/> {fileName}
          </Typography>
          <List>
            <Button color="inherit">Save</Button>
            <Button color="inherit">Download</Button>
            <Button onClick={handleClickOpen} color="inherit">
              Share
            </Button>
            <Button color="inherit">Print</Button>
            {isOwner && <Button color="inherit" onClick={handleClickDelete}>Delete</Button>}
            
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
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleCloseDelete} disabled={!isValidEmail}>Share</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Document</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this document?
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={()=>{
            handleCloseDelete()
            deleteDocument();
          
          }} sx={{color: "red"}} >Delete</Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}
