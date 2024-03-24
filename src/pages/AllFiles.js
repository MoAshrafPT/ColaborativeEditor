import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Container, Typography } from "@mui/material";
import DocumentCard from "../components/DocumentCard";
import SubjectIcon from "@mui/icons-material/Subject";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

export default function AllFiles() {
    const[originalDocuments, setOriginalDocuments] = useState([
        {
          title: "Document 1",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
        {
          title: "Document 2",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
        {
          title: "Document 3",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
        {
          title: "Document 4",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
        {
          title: "Document 5",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
        {
          title: "Document 6",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
        {
          title: "Document 7",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
        {
          title: "Document 8",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
        {
          title: "Document 9",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
        {
          title: "Document 10",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
        {
          title: "Document 11",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
        {
          title: "Document 12",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
        {
          title: "Document 13",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
        {
          title: "Document 14",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
        {
          title: "Document 15",
          content: (
            <SubjectIcon
              sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
            />
          ),
        },
      ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState([{}]);
  useEffect(() => {
    setDocuments([
      {
        title: "Document 1",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
      {
        title: "Document 2",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
      {
        title: "Document 3",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
      {
        title: "Document 4",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
      {
        title: "Document 5",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
      {
        title: "Document 6",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
      {
        title: "Document 7",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
      {
        title: "Document 8",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
      {
        title: "Document 9",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
      {
        title: "Document 10",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
      {
        title: "Document 11",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
      {
        title: "Document 12",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
      {
        title: "Document 13",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
      {
        title: "Document 14",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
      {
        title: "Document 15",
        content: (
          <SubjectIcon
            sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
          />
        ),
      },
    ]);
  }, []);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedDocuments = documents.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  useEffect(() => {
    if (searchQuery !== "") {
      setDocuments(originalDocuments.filter((document) =>
        document.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    else {
        setDocuments(originalDocuments);
    }
  }, [searchQuery]);

  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} />
      <Container>
        <Typography variant="h3" textAlign="center" marginTop="20px">
          Welcome to Textorial
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
                document.title.toLowerCase().includes(searchQuery.toLowerCase())
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
              title={document.title}
              content={document.content}
            />
          ))}
        </div>
        <Pagination
          count={Math.ceil(documents.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Container>
    </>
  );
}
