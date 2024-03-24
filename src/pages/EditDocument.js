import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
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
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />
        </>
    );
}