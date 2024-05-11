import React, { useEffect, useState } from "react";
import TextEditor from "../components/TextEditor";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import EditNavbar from "../components/EditNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditDocument() {

    const {fileId} = useParams();
    const [role,setRole] = useState("");

    useEffect(()=>{
        console.log(localStorage.getItem("userID"),"my id");
        axios
        .get(`http://localhost:8081/user/${localStorage.getItem("userID")}`)
        .then((response) => {
          console.log(response.data.files);
          const resFiles = response.data.files;
          const matchingFile = resFiles.find((file) => file.fileID === fileId);
          console.log("hey: ",matchingFile);
          setRole(matchingFile.role);
          console.log("current role: ",matchingFile.role);
         
        })
        .catch((err) => {
          console.log(err);
          
        });
  
    },[])

   
    
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    return (
        <>
            <EditNavbar fileID = {fileId} role = {role} />
            <TextEditor role = {role} />
        </>
    );
}