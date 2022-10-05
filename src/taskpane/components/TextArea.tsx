import * as React from "react";
import Editor from "@monaco-editor/react"

export interface Props {
    theme: string;
}

const TextArea = (props: Props) => {

    return (
        <div id="text-area">
            <p>{props.theme}</p>
            <Editor 
                width = '100%'
                height = '82vh'
                theme = {props.theme}
                defaultLanguage = ''
            />
        </div>
    )
}

export default TextArea