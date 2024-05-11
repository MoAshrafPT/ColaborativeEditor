import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./TextEditor.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const SAVE_INTERVAL_MS = 5000;

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, false] }],
  [{ font: [] }],
  [{ size: ["small", "normal", "large", "huge"] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: "" }],
  [{ direction: "rtl" }],
  [{ align: [] }],
  ["link", "image", "blockquote", "code-block"],
  ["clean"],
];

export default function TextEditor(props) {
  const { fileId, userId } = useParams();
  const [socket, setSocket] = useState();
  const [content, setContent] = useState("");
  const [quill, setQuill] = useState(null);
  const role = props.role;
  useEffect(() => {
    console.log("inner role ", role);
    const s = io("http://localhost:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      //quill.enable();
    });

    socket.emit("get-document", fileId, userId);
  }, [socket, quill, fileId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      console.log(quill.getContents());
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      console.log(delta);
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
  
    if (props.role === "VIEWER") {
      console.log("disabling");
      quill.disable();
    } else {
      quill.enable();
    }
  }, [props.role, socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Awaiting document to load...");
    setQuill(q);
  }, []);
  return <div className="container" ref={wrapperRef}></div>;
}
