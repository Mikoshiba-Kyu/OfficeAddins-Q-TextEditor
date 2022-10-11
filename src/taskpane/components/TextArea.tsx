// monaco-editor/react
// https://github.com/suren-atoyan/monaco-react
//
// monaco-editor options reference
// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html

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
		monaco.languages.register({ id: 'mylang' })
    monaco.languages.setMonarchTokensProvider('mylang', monacoHighLight())
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

const monacoHighLight = () => {
	return {
		// defaulttoken を invalid にすることで、まだトークン化していないものを確認することができます。
		defaultToken: 'invalid',
	
		keywords: [
			'break', 'case', 'catch', 'class', 'continue', 'const',
			'constructor', 'debugger', 'default', 'delete', 'do', 'else',
			'export', 'extends', 'false', 'finally', 'for', 'from', 'function',
			'get', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'null',
			'return', 'set', 'super', 'switch', 'symbol', 'this', 'throw', 'true',
			'try', 'typeof', 'undefined', 'var', 'void', 'while', 'with', 'yield',
			'async', 'await', 'of'
		],
	
		typeKeywords: [
			'any', 'boolean', 'number', 'object', 'string', 'undefined'
		],
	
		operators: [
			'<=', '>=', '==', '!=', '===', '!==', '=>', '+', '-', '**',
			'*', '/', '%', '++', '--', '<<', '</', '>>', '>>>', '&',
			'|', '^', '!', '~', '&&', '||', '?', ':', '=', '+=', '-=',
			'*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '|=',
			'^=', '@',
		],
	
		// we include these common regular expressions
		symbols: /[=><!~?:&|+\-*\/\^%]+/,
		escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
		digits: /\d+(_+\d+)*/,
		octaldigits: /[0-7]+(_+[0-7]+)*/,
		binarydigits: /[0-1]+(_+[0-1]+)*/,
		hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
	
		regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
		regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,
	
		// The main tokenizer for our languages
		tokenizer: {
			root: [
				[/[{}]/, 'delimiter.bracket'],
				{ include: 'common' }
			],
	
			common: [
				// identifiers and keywords
				[/[a-z_$][\w$]*/, {
					cases: {
						'@typeKeywords': 'keyword',
						'@keywords': 'keyword',
						'@default': 'identifier'
					}
				}],
				[/[A-Z][\w\$]*/, 'type.identifier'],  // to show class names nicely
				// [/[A-Z][\w\$]*/, 'identifier'],
	
				// whitespace
				{ include: '@whitespace' },
	
				// regular expression: ensure it is terminated before beginning (otherwise it is an opeator)
				[/\/(?=([^\\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|\/|,|\)|\]|\}|$))/, { token: 'regexp', bracket: '@open', next: '@regexp' }],
	
				// delimiters and operators
				[/[()\[\]]/, '@brackets'],
				[/[<>](?!@symbols)/, '@brackets'],
				[/@symbols/, {
					cases: {
						'@operators': 'delimiter',
						'@default': ''
					}
				}],
	
				// numbers
				[/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'],
				[/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, 'number.float'],
				[/0[xX](@hexdigits)/, 'number.hex'],
				[/0[oO]?(@octaldigits)/, 'number.octal'],
				[/0[bB](@binarydigits)/, 'number.binary'],
				[/(@digits)/, 'number'],
	
				// delimiter: after number because of .\d floats
				[/[;,.]/, 'delimiter'],
	
				// strings
				[/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
				[/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
				[/"/, 'string', '@string_double'],
				[/'/, 'string', '@string_single'],
				[/`/, 'string', '@string_backtick'],
			],
	
			whitespace: [
				[/[ \t\r\n]+/, ''],
				[/\/\*\*(?!\/)/, 'comment.doc', '@jsdoc'],
				[/\/\*/, 'comment', '@comment'],
				[/\/\/.*$/, 'comment'],
			],
	
			comment: [
				[/[^\/*]+/, 'comment'],
				[/\*\//, 'comment', '@pop'],
				[/[\/*]/, 'comment']
			],
	
			jsdoc: [
				[/[^\/*]+/, 'comment.doc'],
				[/\*\//, 'comment.doc', '@pop'],
				[/[\/*]/, 'comment.doc']
			],
	
			// We match regular expression quite precisely
			regexp: [
				[/(\{)(\d+(?:,\d*)?)(\})/, ['regexp.escape.control', 'regexp.escape.control', 'regexp.escape.control']],
				[/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/, ['regexp.escape.control', { token: 'regexp.escape.control', next: '@regexrange' }]],
				[/(\()(\?:|\?=|\?!)/, ['regexp.escape.control', 'regexp.escape.control']],
				[/[()]/, 'regexp.escape.control'],
				[/@regexpctl/, 'regexp.escape.control'],
				[/[^\\\/]/, 'regexp'],
				[/@regexpesc/, 'regexp.escape'],
				[/\\\./, 'regexp.invalid'],
				[/(\/)([gimsuy]*)/, [{ token: 'regexp', bracket: '@close', next: '@pop' }, 'keyword.other']],
			],
	
			regexrange: [
				[/-/, 'regexp.escape.control'],
				[/\^/, 'regexp.invalid'],
				[/@regexpesc/, 'regexp.escape'],
				[/[^\]]/, 'regexp'],
				[/\]/, { token: 'regexp.escape.control', next: '@pop', bracket: '@close' }],
			],
	
			string_double: [
				[/[^\\"]+/, 'string'],
				[/@escapes/, 'string.escape'],
				[/\\./, 'string.escape.invalid'],
				[/"/, 'string', '@pop']
			],
	
			string_single: [
				[/[^\\']+/, 'string'],
				[/@escapes/, 'string.escape'],
				[/\\./, 'string.escape.invalid'],
				[/'/, 'string', '@pop']
			],
	
			string_backtick: [
				[/\$\{/, { token: 'delimiter.bracket', next: '@bracketCounting' }],
				[/[^\\`$]+/, 'string'],
				[/@escapes/, 'string.escape'],
				[/\\./, 'string.escape.invalid'],
				[/`/, 'string', '@pop']
			],
	
			bracketCounting: [
				[/\{/, 'delimiter.bracket', '@bracketCounting'],
				[/\}/, 'delimiter.bracket', '@pop'],
				{ include: 'common' }
			],
		},
	}
}