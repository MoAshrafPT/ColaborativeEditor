import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Divider,
  InputBase,
  List,
  ListItem,
  Snackbar,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import PersonPinIcon from "@mui/icons-material/PersonPin";

import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Alert,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

export default function EditNavbar(props) {
  const [isValidusername, setIsValidusername] = useState(false);
  const [username, setusername] = useState("");
  useEffect(() => {
    setIsValidusername(username.match(/^[a-zA-Z0-9]+$/));
  }, [username]);

  const [fileName, setFileName] = useState("");

  const [open, setOpen] = useState(false);

  const [accessList, setAccessList] = useState([]);

  const [openDelete, setOpenDelete] = useState(false);

  const [openAccess, setOpenAccess] = useState(false);

  const [shareRole, setShareRole] = useState("EDITOR");

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [alertSeverity, setAlertSeverity] = useState("success");

  const [listToggle, setListToggle] = useState(false);

  const role = props.role;

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

  const handleClickAccess = () => {
    setOpenAccess(true);
  };

  const handleCloseAccess = () => {
    setOpenAccess(false);
  };

  const revokeAccess = (userId) => {
    axios
      .delete(`http://localhost:8081/file/ashraf/${fileId}/${userId}`)
      .then((response) => {
        console.log(response);
        setSnackbarMessage(`this user can no longer access this document`);
        setSnackbarOpen(true);
        setAlertSeverity("error");
        setListToggle(!listToggle);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeRole = (changedUser,newRole) => {
    axios
    .post(
      `http://localhost:8081/file/shareFile/${localStorage.getItem(
        "userID"
      )}`,
      {
        username: changedUser,
        fileId: fileId,
        role: newRole,
      }
    )
    .then((response) => {
      console.log(response);
      setSnackbarMessage(`${changedUser} is now ${newRole}`);
      setSnackbarOpen(true);
      setAlertSeverity("success");
      setListToggle(!listToggle);
    })
    .catch((error) => {
      console.log(error);
      setSnackbarMessage("User not found");
      setSnackbarOpen(true);
      setAlertSeverity("error");
    });
  }

  const { fileId } = useParams();

  
  const [isOwner, setIsOwner] = useState(false);

  const shareDocument = () => {
    axios
      .post(
        `http://localhost:8081/file/shareFile/${localStorage.getItem(
          "userID"
        )}`,
        {
          username: username,
          fileId: fileId,
          role: shareRole,
        }
      )
      .then((response) => {
        console.log(response);
        setSnackbarMessage(`Document shared with ${username}`);
        setSnackbarOpen(true);
        setAlertSeverity("success");
        setListToggle(!listToggle);
      })
      .catch((error) => {
        console.log(error);
        setSnackbarMessage("User not found");
        setSnackbarOpen(true);
        setAlertSeverity("error");
      });
  };

  useEffect(() => {
    console.log(role, "navrole");
    setIsOwner(role === "OWNER");
    axios
      .get(
        `http://localhost:8081/file/${fileId}/${localStorage.getItem("userID")}`
      )
      .then((response) => {
        console.log(response.data);
        setFileName(response.data.fileName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [role]);

  useEffect(() => {
    //find all users who have access to this document
    axios
      .get(`http://localhost:8081/file/access/${fileId}`)
      .then((response) => {
       

        const usersWithRoles = response.data.map(user => {
          const file = user.files.find(file => file.fileID === fileId);
          const role = file ? file.role : null;
          return {
              userID: user.userID,
              username: user.username,
              role: role
          };
      });
        setAccessList(usersWithRoles);
      })
      .catch((err) => console.log(err));
  }, [listToggle]);

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={alertSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <ArrowBackIosIcon
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => window.history.back()}
            />
            <DescriptionIcon /> {fileName}
          </Typography>
          <List>
            <Button color="inherit">Download</Button>

            {isOwner && (
              <>
                <Button onClick={handleClickOpen} color="inherit">
                  Share
                </Button>
                <Button color="inherit" onClick={handleClickDelete}>
                  Delete
                </Button>

                <Button color="inherit" onClick={handleClickAccess}>
                  Manage Access
                </Button>
              </>
            )}
          </List>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share Document</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To share this document, please enter a username here.
          </DialogContentText>
          <TextField
            onChange={(e) => setusername(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="username"
            fullWidth
          />
          <RadioGroup
            aria-label="role"
            name="role"
            value={shareRole}
            onChange={(e) => setShareRole(e.target.value)}
          >
            <FormControlLabel
              value="EDITOR"
              control={<Radio />}
              label="Editor"
            />
            <FormControlLabel
              value="VIEWER"
              control={<Radio />}
              label="Viewer"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              shareDocument(fileId);
              handleClose();
            }}
            disabled={!isValidusername}
          >
            Share
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAccess} onClose={handleCloseAccess}>
        <DialogTitle>Users with access to this document</DialogTitle>
        <DialogContent>
          <List>
            {accessList.map((user) => (
              <>
                <ListItem
                  key={user.userID}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography style={{ marginRight: "10px" }}>
                    {user.username}{" "}
                    {user.userID === localStorage.getItem("userID") && "(you)"}
                  </Typography>
                  {user.userID !== localStorage.getItem("userID") && (
                    <>
                      <Select
                        sx={{ height: "30px" }}
                        value={user.role}
                        label={user.role}
                        onChange={(e)=>{changeRole(user.username,e.target.value)}}
                      >
                        <MenuItem value={"EDITOR"}>Editor</MenuItem>
                        <MenuItem value={"VIEWER"}>Viewer</MenuItem>
                      </Select>
                      <Button
                        onClick={()=>{
                          revokeAccess(user.userID);
                        }}
                        sx={{
                          backgroundColor: "red",
                          color: "white",
                          height: "30px",
                          fontSize: "10px",
                          "&:hover": {
                            backgroundColor: "#ff7f7f",
                          },
                        }}
                      >
                        Revoke
                      </Button>
                    </>
                  )}
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAccess}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
