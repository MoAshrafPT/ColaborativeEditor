import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./TextEditor.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import operationalTransform from "../utils/operationalTranform";
import QuillCursors from "quill-cursors";
import getRandomHexColor from "../utils/getRandomHexColor";
import AsyncLock from "async-lock";
Quill.register("modules/cursors", QuillCursors);

const SAVE_INTERVAL_MS = 2000;

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
  const lock = new AsyncLock();
  let ack = true;
  useEffect(() => {
    console.log("inner role ", role);
    const s = io("http://172.20.10.11:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document, serverVersion) => {
      quill.setContents(document);
      clientVersion = serverVersion;
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

    const handler = async (delta, tempV, acknowledgeID) => {

      await lock.acquire(fileId, async () => {
        if (operationQueue.length > 0 && acknowledgeID === operationQueue[0].uuid) {
          console.log("I am in acknowledge");
          operationQueue = operationQueue.slice(1);
          clientVersion = tempV;
          if (operationQueue.length > 0) {
            console.log("I am in acknowledge if");
            socket.emit("send-changes", operationQueue[0].delta, clientVersion, operationQueue[0].uuid);
          }
          else {
            ack = true;
          }
          return;
        }
        if (operationQueue.length !== 0) {
          console.log("I am in the else statement");
          delta = operationalTransform(delta, operationQueue);
        }
        else {
          clientVersion = tempV;
        }
        quill.updateContents(delta);
        console.log(delta, "delta from receiving");
        console.log(quill.contents, "quill contents")
      });
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

      const operation = { delta, uuid: uuidv4() };
      operationQueue.push(operation);

      if (ack === true) {
        ack = false;
        socket.emit("send-changes", operationQueue[0].delta, clientVersion, operationQueue[0].uuid);
      }

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

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handleCursorChange = (cursor) => {
      console.log("I am in cursor change", cursor);
      quill.getModule("cursors").removeCursor(cursor.id);
      quill
        .getModule("cursors")
        .createCursor(cursor.id, cursor.name, cursor.color);

      quill.getModule("cursors").moveCursor(cursor.id, cursor.range);

    };

    socket.on("cursor-change", handleCursorChange);

    return () => {
      socket.off("cursor-change", handleCursorChange);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    quill.on("selection-change", (range, oldRange, source) => {
      if (range) {
        const cursor = {
          id: userId,
          name: localStorage.getItem("username"), // Provide the user's name
          color: getRandomHexColor(userId), // Set the cursor color
          range: range,
        };
        socket.emit("cursor-change", cursor);
      }
    });

    return () => {
      quill.off("selection-change");
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      value: "skksssssss",
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS, cursors: true },
    });
    Quill.register('modules/cursors', QuillCursors);
    q.disable();
    q.setText("Awaiting document to load...");
    setQuill(q);
  }, []);
  return <div className="container" ref={wrapperRef}></div>;
}
