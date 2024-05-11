import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button, Container, Typography } from "@mui/material";
import DocumentCard from "../components/DocumentCard";
import SubjectIcon from "@mui/icons-material/Subject";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { myDocs } from "../mocks/data/files";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function AllFiles() {
  const navigate = useNavigate();
  const [originalDocuments, setOriginalDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState([{}]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const userId = localStorage.getItem("userID");
    axios
      .get(`http://localhost:8081/user/${userId}`)
      .then((response) => {
        console.log(response);
        setDocuments(response.data.files);
        setOriginalDocuments(response.data.files);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedDocuments = documents.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (searchQuery !== "") {
      setDocuments(
        originalDocuments.filter((document) =>
          document.fileName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setDocuments(originalDocuments);
    }
  }, [searchQuery]);

  const deleteDocument = (documentId) => {
    const userId = localStorage.getItem("userID");
    axios
      .delete(`http://localhost:8081/file/delete/${documentId}/${userId}`)
      .then((response) => {
        console.log(response);
        axios
          .get(`http://localhost:8081/user/${userId}`)
          .then((response) => {
            console.log(response);
            setDocuments(response.data.files);
            setOriginalDocuments(response.data.files);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  const renameDocument = (documentId, newName) => {
    const userId = localStorage.getItem("userID");

    console.log(documentId, userId);
    axios
      .put(`http://localhost:8081/file/update/${documentId}/${userId}`, {
        fileName: newName,
      })
      .then((response) => {
        console.log(response);
        axios
          .get(`http://localhost:8081/user/${userId}`)
          .then((response) => {
            console.log(response);
            setDocuments(response.data.files);
            setOriginalDocuments(response.data.files);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  const removeDocument = (documentId) => {
    const userId = localStorage.getItem("userID");
    axios
      .delete(`http://localhost:8081/file/ashraf/${documentId}/${userId}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      }).catch((error) => {
        console.log(error);
      });
  };

  const createDocument = (name) => {
    const userId = localStorage.getItem("userID");
    console.log(name, userId);
    axios
      .post("http://localhost:8081/file/createFile", {
        fileName: name,
        userId: userId,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          navigate(`/edit/${response.data.fileID}/${userId}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!Cookies.get("token")) {
    navigate("/login");
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} />
      <Container>
        <Typography variant="h3" textAlign="center" marginTop="20px">
          Welcome to AFOTE!
        </Typography>
        <Typography variant="h6" textAlign="center" marginTop="20px">
          Here are your recent documents
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          {(searchQuery
            ? documents.filter((document) =>
                document.fileName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
            : documents
          ).length === 0 && (
            <Typography variant="h6" textAlign="center" marginTop="20px">
              No documents found
            </Typography>
          )}
          {paginatedDocuments.map((document, index) => (
            <DocumentCard
              key={index}
              title={document.fileName}
              content={document.role}
              id={document.fileID}
              deleteDocument={deleteDocument}
              renameDocument={renameDocument}
              removeDocument={removeDocument}
            />
          ))}
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Pagination
            count={Math.ceil(documents.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Button
            onClick={handleClickOpen}
            variant="contained"
            startIcon={<SubjectIcon />}
            sx={{ marginTop: 2 }}
          >
            Create New Document
          </Button>
        </div>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Document</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter name of the new document.</DialogContentText>
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
          <Button
            onClick={() => {
              handleClose();
              createDocument(name);
            }}
            disabled={name.length === 0}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
