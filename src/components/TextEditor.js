import React, { useCallback, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './TextEditor.css';


const TOOLBAR_OPTIONS = [
    [{ 'header': [1, 2, 3, 4, 5, false] }],
    [{ 'font': [] }],
    [{ 'size': ['small', 'normal', 'large', 'huge'] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{align: ''}],
    [{ 'direction': 'rtl' }],
    [{ 'align': [] }],
    ['link', 'image','blockquote', 'code-block'],
    ['clean']
];
export default function TextEditor(){

    const wrapperRef = useCallback((wrapper) => {
        if(wrapper == null) return;
        wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.append(editor);
        new Quill(editor, {theme: 'snow', modules: {toolbar: TOOLBAR_OPTIONS}});
    }, []);
    return <div class="container" ref={wrapperRef}></div>
}