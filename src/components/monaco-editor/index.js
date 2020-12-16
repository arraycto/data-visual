import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from "react";
import MonacoEditor, { monaco } from "@monaco-editor/react";
import { isLooselyNumber, isCssLength } from "~renderer/utils";

import Loading from "../auto-loading";

const CodePanel = (props, ref) => {
  const editorRef = useRef();
  const [code, setCode] = useState("// try to write code somewhere 😈 \n");
  let { value, width, height, readOnly = false, language = "json" } = props;

  const calcUtil = useCallback(
    (item) => {
      return isLooselyNumber(item) ? Number(item) : isCssLength(item) ? item : "100%";
    },
    [width, height]
  );

  // you can configure the locales
  monaco.config({ "vs/nls": { availableLanguages: { "*": "zh-cn" } } });

  useImperativeHandle(ref, () => ({
    getValue: () => JSON.parse(editorRef.current.getValue())
  }));

  useEffect(() => {
    try {
      setCode(JSON.stringify(value, null, 4));
    } catch (e) {
      // ignore
    }
  }, [value, language]);

  return (
    <MonacoEditor
      width={calcUtil(width)}
      height={calcUtil(height)}
      theme="dark"
      language={language}
      loading={<Loading />}
      value={code}
      options={{
        contextmenu: false,
        wrappingIndent: "deepIndent",
        readOnly: readOnly,
        automaticLayout: true,
        autoIndent: true,
        formatOnType: true,
        formatOnPaste: true,
        scrollBeyondLastLine: false,
        renderControlCharacters: false,
        minimap: {
          enabled: false
        }
      }}
      editorDidMount={(ev, editor) => {
        editorRef.current = editor;
      }}
    />
  );
};

export default forwardRef(CodePanel);
