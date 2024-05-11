import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import "./DocumentCard.css";

export default function DocumentCard(props) {
  const deleteDocument = props.deleteDocument;
  const renameDocument = props.renameDocument;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const userId = localStorage.getItem("userID");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deleteDocument(props.id);
    handleMenuClose();
  };

  const handleRemove = () => {
    props.removeDocument(props.id);
    handleMenuClose();
  };

  const handleRenameClick = () => {
    setIsRenameDialogOpen(true);
    handleMenuClose();
  };

  const handleRenameDialogClose = () => {
    setIsRenameDialogOpen(false);
    setNewName("");
  };

  const handleRenameConfirm = () => {
    if (newName.trim() !== "") {
      renameDocument(props.id, newName);
      handleRenameDialogClose();
    }
  };

  return (
    <>
      <div
        className="document-card"
        onClick={(e) => {
          navigate(`/edit/${props.id}/${userId}`);
        }}
      >
        <div className="document-card-header">
          <Typography variant="h6" className="document-card-title">
            {props.title}
          </Typography>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleMenuOpen(event);
            }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={(event) => {
              event.stopPropagation();
              handleMenuClose();
            }}
          >
            {props.content === "OWNER" && (
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                Delete permanently
              </MenuItem>
            )}
            {(props.content === "OWNER" || props.content === "EDITOR" ) && (
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleRenameClick();
                }}
              >
                Rename
              </MenuItem>
            )}

            {(props.content === "VIEWER" || props.content === "EDITOR") && (
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
              >
                  Remove
              </MenuItem>
            )}
          </Menu>
        </div>
        <div className="document-card-content">
          <Typography variant="body2">{props.content}</Typography>
        </div>
      </div>
      <Dialog open={isRenameDialogOpen} onClose={handleRenameDialogClose}>
        <DialogTitle>Rename Document</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newName"
            label="New Name"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRenameDialogClose}>Cancel</Button>
          <Button onClick={handleRenameConfirm}>Rename</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
