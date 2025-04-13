import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const JoditEditorComponent = ({ content, setContent }) => {
  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Start typing here...",
    toolbarSticky: true,
    toolbarAdaptive: true,
    autofocus: true,
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => setContent(newContent)}
      />
    </div>
  );
};

export default JoditEditorComponent;
