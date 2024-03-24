import React from "react";
import "./DocumentCard.css";
import { useNavigate } from "react-router-dom";

export default function DocumentCard(props) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card"
        onClick={() => {
          navigate("/edit");
        }}
      >
        <div
          className="card-body"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h5 className="card-title">{props.title}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "40px",
            }}
          >
            {props.content}
          </div>
        </div>
      </div>
    </>
  );
}
