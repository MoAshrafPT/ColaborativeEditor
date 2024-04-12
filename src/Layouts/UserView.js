import React from "react";
import Navbar from "../components/Navbar";
import { Container, Typography } from "@mui/material";
import DocumentCard from "../components/DocumentCard";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { recentDocuments, documentTypes } from "../mocks/data/files";
import { useEffect } from "react";

export default function UserView() {
  const [searchQuery, setSearchQuery] = useState("");

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
            Welcome User!
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
            <DocumentCard title={doc.title} content={doc.content} />
          ))}
        </div>
      </section>
    </>
  );
}
