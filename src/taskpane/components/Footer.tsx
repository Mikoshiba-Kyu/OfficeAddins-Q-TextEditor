import * as React from "react"
import { DefaultPalette, Stack, IStackStyles, IStackItemStyles } from '@fluentui/react'
import { BaseButton, ActionButton } from '@fluentui/react/lib/Button'

export interface Props {
	theme: string
	language: string
	fontFamily: string
	fontSize: number
	tabSize: number
	openPanel: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | HTMLSpanElement | BaseButton>
}

const Footer = (props: Props) => {
	// Styles definition
	const stackStyles: IStackStyles = {
		root: {
			background: DefaultPalette.blueDark,
		}
	}

	const stackItemStyles: IStackItemStyles = {
		root: {
			alignItems: 'left',
			background: DefaultPalette.blueDark,
			color: DefaultPalette.white,
			height: '1.2rem',
			display: 'flex',
			justifyContent: 'left',
			fontSize: '8px'
		}
	}

	return (
		<Stack horizontal horizontalAlign="end" styles={stackStyles}>
			<Stack.Item styles={stackItemStyles}>
				<ActionButton styles={stackItemStyles}>{`${convertDisplayLanguage(props.language)}`}</ActionButton>
			</Stack.Item>
			<Stack.Item styles={stackItemStyles}>
				<ActionButton styles={stackItemStyles}>{`フォントサイズ  :  ${props.fontSize}`}</ActionButton>
			</Stack.Item>
			<Stack.Item styles={stackItemStyles}>
				<ActionButton styles={stackItemStyles}>{`Tabサイズ  :  ${props.tabSize}`}</ActionButton>
			</Stack.Item>
			<Stack.Item styles={stackItemStyles}>
				<ActionButton styles={stackItemStyles}>{`UTF-8`}</ActionButton>
			</Stack.Item>
			<Stack.Item styles={stackItemStyles}>
				<ActionButton styles={stackItemStyles} onClick={props.openPanel}>{`Settings`}</ActionButton>
			</Stack.Item>
		</Stack>
	)
}

export default Footer

const convertDisplayLanguage = (languageKey: string): string => {
	let displayLanguage: string
	switch (languageKey) {
		// highlight and intelligence.
		case 'typescript' : {
			displayLanguage = 'TypeScript'
			break
		}
		case 'javascript' : {
			displayLanguage = 'JavaScript'
			break
		}
		case 'css' : {
			displayLanguage = 'CSS'
			break
		}
		case 'less' : {
			displayLanguage = 'LESS'
			break
		}
		case 'scss' : {
			displayLanguage = 'SCSS'
			break
		}
		case 'json' : {
			displayLanguage = 'JSON'
			break
		}
		case 'html' : {
			displayLanguage = 'HTML'
			break
		}

		// highlight only.
		case 'm' : {
			displayLanguage = 'M言語'
			break
		}
		case 'xml' : {
			displayLanguage = 'XML'
			break
		}
		case 'php' : {
			displayLanguage = 'PHP'
			break
		}
		case 'c#' : {
			displayLanguage = 'C#'
			break
		}
		case 'c++' : {
			displayLanguage = 'C++'
			break
		}
		case 'razor' : {
			displayLanguage = 'Razor'
			break
		}
		case 'markdown' : {
			displayLanguage = 'Markdown'
			break
		}
		case 'java' : {
			displayLanguage = 'Java'
			break
		}
		case 'vb' : {
			displayLanguage = 'VB'
			break
		}
		case 'coffeescript' : {
			displayLanguage = 'CoffeeScript'
			break
		}
		case 'handlebars' : {
			displayLanguage = 'Handlebars'
			break
		}
		case 'batch' : {
			displayLanguage = 'Batch'
			break
		}
		case 'pug' : {
			displayLanguage = 'Pug'
			break
		}
		case 'f#' : {
			displayLanguage = 'F#'
			break
		}
		case 'lua' : {
			displayLanguage = 'Lua'
			break
		}
		case 'powershell' : {
			displayLanguage = 'Powershell'
			break
		}
		case 'python' : {
			displayLanguage = 'Python'
			break
		}
		case 'ruby' : {
			displayLanguage = 'Ruby'
			break
		}
		case 'sass' : {
			displayLanguage = 'SASS'
			break
		}
		case 'r' : {
			displayLanguage = 'R'
			break
		}
		case 'objective-c' : {
			displayLanguage = 'Objective-C'
			break
		}
	}
	return displayLanguage
}