import React, { useState } from "react";
import TextEditor from "../components/TextEditor";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import EditNavbar from "../components/EditNavbar";


export default function EditDocument() {


   
    
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    return (
        <>
            <EditNavbar />
            <TextEditor/>
        </>
    );
}