import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Container, Typography } from "@mui/material";
import DocumentCard from "../components/DocumentCard";
import AddIcon from "@mui/icons-material/Add";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import SubjectIcon from "@mui/icons-material/Subject";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const recentDocuments = [
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
  ];
  const documentTypes = [
    {
      title: "Report",
      content: (
        <SummarizeIcon
          sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
        />
      ),
    },
    {
      title: "Proposal",
      content: (
        <PlagiarismIcon
          sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
        />
      ),
    },
    {
      title: "Brochure",
      content: (
        <FilePresentIcon
          sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
        />
      ),
    },
    {
      title: "Letter",
      content: (
        <MarkAsUnreadIcon
          sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
        />
      ),
    },
    {
      title: "Resume",
      content: (
        <ContactEmergencyIcon
          sx={{ fontSize: "110px", cursor: "pointer", color: "#3f51b5" }}
        />
      ),
    },
  ];
  const [searchedDocuments, setSearchedDocuments] = useState(recentDocuments);
  useEffect(() => {
    if (searchQuery) {
      setSearchedDocuments(
        recentDocuments.filter((document) =>
          document.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    else {
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
