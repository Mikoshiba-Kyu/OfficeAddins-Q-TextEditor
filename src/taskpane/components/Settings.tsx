import * as React from 'react';
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown'
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup'
import { Slider } from '@fluentui/react'


// ----------------- テーマ -----------------
const themeOptions: IChoiceGroupOption[] = [
	{ key: 'light', text: 'Light' },
	{ key: 'vs-dark', text: 'Dark' }
]

// ----------------- 言語 -----------------
const languageList = [
	// highlight and intellisense.
	{key: 'typescript', text: 'TypeScript'},
	{key: 'javascript', text: 'JavaScript'},
	{key: 'css', text: 'CSS'},
	{key: 'less', text: 'LESS'},
	{key: 'scss', text: 'SCSS'},
	{key: 'json', text: 'JSON'},
	{key: 'html', text: 'HTML'},
	// highlight only.
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

const languageListStyle: Partial<IDropdownStyles> = {
	dropdown: {
		fontSize: 16
	}
}

// ----------------- フォントサイズ -----------------


export interface Props {
	theme: string
	language: string
	fontSize: number
	fontFamily: string
	setTheme
	setLanguage
	setFontSize
}

const Settings = (props: Props) => {

	// テーマ
	const [selectedKey, setSelectedKey] = React.useState<string | undefined>(props.theme)
	const onThemeChange = React.useCallback((_event: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
		setSelectedKey(option.key)
		props.setTheme(option.key)
	}, [])

	// 言語
	const [selectedLanguage, setSelectedLanguage] = React.useState<IDropdownOption>()
	const onLanguageChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
		setSelectedLanguage(item)
		props.setLanguage(item.key)
	}

	// フォントサイズ
	const [fontSize, setFontSize] = React.useState(props.fontSize);
  const onFontSizeChange = (value: number) => {
	setFontSize(value)
	props.setFontSize(value)
  }

	return (
		<>
			<ChoiceGroup 
				defaultSelectedKey={props.theme}
				selectedKey={selectedKey}
				options={themeOptions}
				onChange={onThemeChange}
				label="テーマ"
			/>
			<Dropdown
				selectedKey={selectedLanguage ? selectedLanguage.key : undefined}
				label="言語"
				options={languageList}
				defaultSelectedKey={props.language}
				styles={languageListStyle}
				onChange={onLanguageChange}
			/>
			<Slider
				label="フォントサイズ"
				min={8}
				max={36}
				step={2}
				defaultValue={props.fontSize}
				value={fontSize}
				onChange={onFontSizeChange}
				showValue
				snapToStep />
		</>
	)
}

export default Settings