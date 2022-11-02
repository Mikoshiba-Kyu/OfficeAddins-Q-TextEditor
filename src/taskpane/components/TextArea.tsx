/*
monaco-editor/react
https://github.com/suren-atoyan/monaco-react

monaco-editor options reference
https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html

monarch
https://microsoft.github.io/monaco-editor/monarch.html
*/

// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'TextArea.tsx'

// ---------------------- Import ----------------------
import * as React from "react";
import Editor from "@monaco-editor/react"
import { useMonacoSettings } from '../hooks/useMonacoSettings'

// ---------------------- Props ----------------------
export interface Props {
	theme: string
}

// ---------------------- Contents ----------------------
const TextArea = (props: Props) => {
	isLogging && console.log(`[Addins] [${moduleName}] レンダリング`)

	const { language, fontFamily, fontSize, tabSize } = useMonacoSettings()

	function handleEditorWillMount(monaco) {
    	// monaco's instance
		monaco.languages.register({ id: 'm' })
		monaco.languages.setMonarchTokensProvider('m', mLangSyntax())
		monaco.languages.setMonarchTokensProvider('plane', planeText())
	}

	function handleEditorValidation(markers) {
		// model markers
		markers.forEach((marker) => console.log("onValidate:", marker.message));
	}

	return (
		<div className="monaco-editor">
			<Editor 
				theme = {props.theme}
				language = {language}
				defaultValue = 'sample text'
				width = '100%'
				height = 'calc(100vh - 1.2rem)'
				beforeMount={handleEditorWillMount}
				onValidate={handleEditorValidation}
				options = {{ fontFamily: fontFamily, fontSize: fontSize, tabSize: tabSize}}
		/>
		</div>
	)
}
export default TextArea

// ---------------------- Logic ----------------------
const mLangSyntax = () => {
	return {
		// defaultToken: 'invalid' を有効化することで、まだトークン化していない部分を赤字にすることができます。
		// defaultToken: 'invalid',
	
		keywords: [ 'class', 'new', 'string', 'number', 'boolean', 'private', 'public' ],
		
		// The main tokenizer for our languages
		tokenizer: {
			root: [
				[/@?[a-zA-Z][\w$]*/, {
					cases: {
						'@keywords': 'keyword',
						'@default': 'variable'
					}
				}],
			],
			comment: [
				[/\/\//, 'comment']
			],
		
			string: [
				[/".*?"*/, 'string']
			],
		}
	}
}

const planeText = () => {
	return {
		tokenizer: {}
	}
}