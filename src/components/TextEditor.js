import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./TextEditor.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import operationalTransform from "../utils/operationalTranform";

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
  // const [clientVersion, setClientVersion] = useState(0);
  let clientVersion = 0;
  // const [operationQueue, setOperationQueue] = useState([]);
  let operationQueue = [];
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

    socket.once("load-document", (document, serverVersion) => {
      quill.setContents(document);
      clientVersion = serverVersion + 1;
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

    const handler = (delta, tempV, acknowledgeID) => {
      console.log("YYYYYYYy", delta, tempV, acknowledgeID);
      console.log(operationQueue, "operationQueue");
  

      if (operationQueue[0] && acknowledgeID === operationQueue[0].uuid) {
        console.log("I am in the if statement");
        // setOperationQueue((prev) => prev.slice(1));
        operationQueue = operationQueue.slice(1);
        return;
      } else {
        if (operationQueue.length !== 0) {
          console.log("I am in the else statement");
          delta = operationalTransform(delta, operationQueue);
        }

        quill.updateContents(delta);
      }
      console.log(tempV, "version from receiving");
      // setClientVersion(tempV);
      clientVersion = tempV;
     
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
      console.log(" I am in text change");
      const operation = { delta, uuid: uuidv4() };
      operationQueue.push(operation);
      console.log(operationQueue, "operationQueue in sending");
      console.log("clientVersion", clientVersion);
      socket.emit("send-changes", delta, clientVersion, operation.uuid);
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

  useEffect(()=>{
    if (socket == null || quill == null) return;

    const handler = (acknowledgeID, tempV) => {
      console.log("I am in acknowledge");
      if (operationQueue[0] && acknowledgeID === operationQueue[0].uuid) {
        console.log("I am in the if statement");
        operationQueue = operationQueue.slice(1);
        console.log(operationQueue, "operationQueue");
      }
      console.log(tempV, "version from acknowledge");
      clientVersion = tempV;
    };
    socket.on("acknowledge", handler);

  },[quill,socket])

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      value: "skksssssss",
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    // q.setText("Awaiting document to load...");
    setQuill(q);
  }, []);
  return <div className="container" ref={wrapperRef}></div>;
}
