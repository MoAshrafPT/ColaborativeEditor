import React from "react";
import Navbar from "../components/Navbar";
import { Container, Typography } from "@mui/material";
import DocumentCard from "../components/DocumentCard";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import {  documentTypes } from "../mocks/data/files";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";

export default function UserView() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const user = localStorage.getItem("username");

  const files = JSON.parse(localStorage.getItem("files"));

  const [recentDocuments, setRecentDocuments] = useState(files);

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createDocument = (name) => {
    const userId = localStorage.getItem("userID");
    console.log(name, userId);
    axios
      .post("http://localhost:8080/file/createFile", {
        fileName: name,
        userId: userId,
      })
      .then((response) => {
        console.log(response);
        if(response.status === 201){
          navigate(`/edit/${response.data.fileID}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [searchedDocuments, setSearchedDocuments] = useState(recentDocuments);
  useEffect(() => {
    if (searchQuery) {
      setSearchedDocuments(
        recentDocuments.filter((document) =>
          document.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setSearchedDocuments(recentDocuments);
    }
  }, [searchQuery]);
  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} />
      <section style={{ backgroundColor: "#f1f1f1" }}>
        <Container
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h4" textAlign="center">
            Welcome {user}!
          </Typography>
          <Typography variant="h6" textAlign="center">
            Start a new document
          </Typography>
        </Container>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <DocumentCard
          onClick={handleClickOpen}
            title="Blank Document"
            content={
              <AddIcon
                sx={{
                  fontSize: "110px",
                  cursor: "pointer",
                  color: "#3f51b5",
                }}
              />
            }
          />
          {documentTypes.map((doc) => (
            <DocumentCard title={doc.title} content={doc.content} />
          ))}
        </div>
      </section>
      <section>
        <Container
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6" textAlign="center">
            Recent Documents
          </Typography>
        </Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {(searchQuery
            ? searchedDocuments.filter((document) =>
                document.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : searchedDocuments
          ).length === 0 && (
            <Typography variant="h6" textAlign="center" marginTop="20px">
              No documents found
            </Typography>
          )}
          {searchedDocuments.map((doc) => (
            <DocumentCard title={doc.fileName} content={doc.role} />
          ))}
        </div>
      </section>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share Document</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Enter name of the new document.
          </DialogContentText>
          <TextField
          onChange={(e) => setName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{
            handleClose();
            createDocument(name);
            }} disabled={name.length === 0}>Create</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
