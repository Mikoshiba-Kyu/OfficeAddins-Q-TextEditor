import * as React from "react";
import Editor from "@monaco-editor/react"

/*
export interface Props {
    setCellValue: Function;
    cellValue: string;
    sheetName: string;
    address: string;
}
*/

const TextArea = () => {
    return (
        <div id="text-area">
            <Editor
                className="main-editor"
                width='100%'
                height='70vh'
                theme='light'
                defaultLanguage=''
                options={{
                    "cursorStyle":"line",
                    "minimap": {
                        "enabled": false
                    },
                    "fontFamily": "Meiryo UI"
                }}
            />
        </div>
    )
}

export default TextArea