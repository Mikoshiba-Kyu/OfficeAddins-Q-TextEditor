// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'Settings.tsx'

// ---------------------- Import ----------------------
import * as React from 'react'
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown'
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup'
import { Slider } from '@fluentui/react'
import { Spacer } from './Spacer'

// ---------------------- Types ----------------------
type MonacoSettings = {
	language?: string,
	fontFamily?: string,
	fontSize?: number,
	tabSize?: number
}

// ---------------------- Props ----------------------
export interface Props {
	theme: string
	setTheme
	monacoSettings: MonacoSettings
	changeMonacoSettings: Function
}

// ---------------------- Contents ----------------------
const Settings = (props: Props) => {
	isLogging && console.log(`[Addins] [${moduleName}] レンダリング`)

	// テーマ
	const [selectedTheme, setSelectedTheme] = React.useState<string | undefined>(props.theme)
	const onThemeChange = React.useCallback((_event: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
		setSelectedTheme(option.key)
		props.setTheme(option.key)
	}, [])

	// 言語
	const [selectedLanguage, setSelectedLanguage] = React.useState<IDropdownOption>()
	const onLanguageChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
		setSelectedLanguage(item)
		props.changeMonacoSettings({ language: item.key.toString() })
	}

	// フォントファミリー
	const [selectedFontFamily, setSelectedFontFamily] = React.useState<IDropdownOption>()
	const onFontFamilyChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
		setSelectedFontFamily(item)
		props.changeMonacoSettings({ fontFamily: item.key.toString() })
	}

	// フォントサイズ
	const [inputFontSize, setInputFontSize] = React.useState(props.monacoSettings.fontSize);
	const onFontSizeChange = (value: number) => {
		setInputFontSize(value)
		props.changeMonacoSettings({ fontSize: value })
	}

	// タブサイズ
	const [inputTabSize, setInputTabSize] = React.useState(props.monacoSettings.tabSize);
	const onTabSizeChange = (value: number) => {
		setInputTabSize(value)
		props.changeMonacoSettings({ tabSize: value })
	}

	return (
		<>
			<Spacer size='2rem'></Spacer>
			<ChoiceGroup 
				defaultSelectedKey={props.theme}
				selectedKey={selectedTheme}
				options={themeOptions}
				onChange={onThemeChange}
				label="テーマ"
			/>
			<Spacer size='2rem'></Spacer>
			<Dropdown
				selectedKey={selectedLanguage ? selectedLanguage.key : undefined}
				label="言語"
				options={languageList}
				defaultSelectedKey={props.monacoSettings.language}
				styles={listStyle}
				onChange={onLanguageChange}
			/>
			<Spacer size='2rem'></Spacer>
			<Dropdown
				selectedKey={selectedFontFamily ? selectedFontFamily.key : undefined}
				label="フォント"
				options={fontFamilyList}
				defaultSelectedKey={props.monacoSettings.fontFamily}
				styles={listStyle}
				onChange={onFontFamilyChange}
			/>
			<Spacer size='2rem'></Spacer>
			<Slider
				label="フォントサイズ"
				min={8}
				max={36}
				step={2}
				defaultValue={props.monacoSettings.fontSize}
				value={inputFontSize}
				onChange={onFontSizeChange}
				showValue
				snapToStep
			/>
			<Spacer size='2rem'></Spacer>
			<Slider
				label="Tabサイズ"
				min={2}
				max={4}
				step={2}
				defaultValue={props.monacoSettings.tabSize}
				value={inputTabSize}
				onChange={onTabSizeChange}
				showValue
				snapToStep
			/>
		</>
	)
}

export default Settings

// ----------------- テーマ -----------------
const themeOptions: IChoiceGroupOption[] = [
	{ key: 'light', text: 'Light' },
	{ key: 'vs-dark', text: 'Dark' }
]

// ----------------- 言語 -----------------
const languageList = [
	// Plain Text.
	{key: 'plainText', text: 'PlainText'},

	// highlight and intellisense.
	{key: 'typescript', text: 'TypeScript'},
	{key: 'javascript', text: 'JavaScript'},
	{key: 'css', text: 'CSS'},
	{key: 'less', text: 'LESS'},
	{key: 'scss', text: 'SCSS'},
	{key: 'json', text: 'JSON'},
	{key: 'html', text: 'HTML'},
	// highlight only.
	{key: 'm', text: 'M言語'},
	{key: 'xml', text: 'XML'},
	{key: 'php', text: 'PHP'},
	{key: 'c#', text: 'C#'},
	{key: 'c++', text: 'C++'},
	{key: 'razor', text: 'Razor'},
	{key: 'markdown', text: 'Markdown'},
	{key: 'java', text: 'Java'},
	{key: 'vb', text: 'VB'},
	{key: 'coffeescript', text: 'CoffeeScript'},
	{key: 'handlebars', text: 'Handlebars'},
	{key: 'batch', text: 'Batch'},
	{key: 'pug', text: 'Pug'},
	{key: 'f#', text: 'F#'},
	{key: 'lua', text: 'Lua'},
	{key: 'powershell', text: 'Powershell'},
	{key: 'python', text: 'Python'},
	{key: 'ruby', text: 'Ruby'},
	{key: 'sass', text: 'SASS'},
	{key: 'r', text: 'R'},
	{key: 'objective-c', text: 'Objective-C'}
]

// ----------------- フォントファミリー -----------------
const fontFamilyList = [
	{ key: '"Robot Mono", "Sawarabi Gothic", monospace', text: 'Robot Mono' },
	{ key: '"Source Code Pro", "Sawarabi Gothic", monospace', text: 'Source Code Pro' },
	{ key: '"Anonymous Pro", "Sawarabi Gothic", monospace', text: 'Anonymous Pro' },
	{ key: '"Ubuntu Mono", "Sawarabi Gothic", monospace', text: 'Ubuntu Mono' }
]

const listStyle: Partial<IDropdownStyles> = {
	dropdown: {
		fontSize: 16
	}
}
