/*
monaco-editor/react
https://github.com/suren-atoyan/monaco-react

monaco-editor options reference
https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html

monarch
https://microsoft.github.io/monaco-editor/monarch.html
*/

import * as React from "react";
import Editor from "@monaco-editor/react"

export interface Props {
	theme: string
	language: string
	fontFamily: string
	fontSize: number
	tabSize: number
}

const TextArea = (props: Props) => {
	function handleEditorWillMount(monaco) {
    	// monacoのインスタンスはこちらです。
		// エディタがマウントされる前に何かする
		monaco.languages.register({ id: 'm' })
		monaco.languages.setMonarchTokensProvider('m', mLangSyntax())
	}

	function handleEditorValidation(markers) {
		// model markers
		markers.forEach((marker) => console.log("onValidate:", marker.message));
	}

	return (
		<div className="monaco-editor">
			<Editor 
				theme = {props.theme}
				language = {props.language}
				defaultValue = 'sample text'
				width = '100%'
				height = 'calc(100vh - 1.2rem)'
				beforeMount={handleEditorWillMount}
				onValidate={handleEditorValidation}
				options = {{ fontFamily: props.fontFamily, fontSize: props.fontSize, tabSize: props.tabSize}}
		/>
		</div>
	)
}

export default TextArea

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

const bk_mLangSyntax = () => {
	return {
		// defaultToken: 'invalid' を有効化することで、まだトークン化していない部分を赤字にすることができます。
		// defaultToken: 'invalid',
	
		keywords: [
			'and', 'or', 'not', 'if', 'then', 'else', 'try', 'catch',
			'otherwise', 'as', 'each', 'in', 'is', 'let', 'meta', 'type',
			'error', 'section', 'shared'
		],
		
		typeKeywords: [
			'optional', 'nullable', 'action', 'any', 'anynonnull', 'binary',
			'date', 'datetime', 'datetimezone', 'duration', 'function', 'list',
			'logical', 'none', 'null', 'number', 'record', 'table', 'text', 'time', 'type'
		],
		
		operators: [
			'=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
			'&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
			'<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
			'%=', '<<=', '>>=', '>>>=', '??'
		],
		
		// we include these common regular expressions
		symbols:  /[=><!~?:&|+\-*\/\^%]+/,
		
		// C# style strings
		escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
		
		// The main tokenizer for our languages
		tokenizer: {
			root: [
				// identifiers and keywords
				[/[a-z_$][\w$]*/, { cases: { '@typeKeywords': 'keyword',
											'@keywords': 'keyword',
											'@default': 'identifier' } }],
				[/[A-Z][\w\$]*/, 'type.identifier' ],  // to show class names nicely
			
				// whitespace
				{ include: '@whitespace' },
			
				// delimiters and operators
				[/[{}()\[\]]/, '@brackets'],
				[/[<>](?!@symbols)/, '@brackets'],
				[/@symbols/, { cases: { '@operators': 'operator',
										'@default'  : '' } } ],
		
				// @ annotations.
				// As an example, we emit a debugging log message on these tokens.
				// Note: message are supressed during the first load -- change some lines to see them.
				[/@\s*[a-zA-Z_\$][\w\$]*/, { token: 'annotation', log: 'annotation token: $0' }],
		
				// numbers
				[/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
				[/0[xX][0-9a-fA-F]+/, 'number.hex'],
				[/\d+/, 'number'],
		
				// delimiter: after number because of .\d floats
				[/[;,.]/, 'delimiter'],
			
				// strings
				[/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
				[/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],
			
				// characters
				[/'[^\\']'/, 'string'],
				[/(')(@escapes)(')/, ['string','string.escape','string']],
				[/'/, 'string.invalid']
			],
		
			comment: [
				[/[^\/*]+/, 'comment' ],
				[/\/\*/,    'comment', '@push' ],    // nested comment
				["\\*/",    'comment', '@pop'  ],
				[/[\/*]/,   'comment' ]
			],
		
			string: [
				[/[^\\"]+/,  'string'],
				[/@escapes/, 'string.escape'],
				[/\\./,      'string.escape.invalid'],
				[/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
			],
		
			whitespace: [
				[/[ \t\r\n]+/, 'white'],
				[/\/\*/,       'comment', '@comment' ],
				[/\/\/.*$/,    'comment'],
			]
		}
	}
}