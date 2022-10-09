import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown'
import type { MonacoProps } from './App'

// ----------------- 言語-----------------
const languageList = [
	{key: 'javascript', text: 'JavaScript'},
	{key: 'vba', text: 'VBA'},
	{key: 'm', text: 'M言語'}		
]

const languageListStyle: Partial<IDropdownStyles> = {
	dropdown: {
		fontSize: 16
	}
}
// ----------------------------------------

export interface Props {
	monacoProps: MonacoProps
	setLanguage
}

const Settings = (props: Props) => {

	const [selectedLanguage, setSelectedLanguage] = React.useState<IDropdownOption>();

	const onLanguageChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
		setSelectedLanguage(item);
		props.setLanguage(selectedLanguage)
	}

	return (
		<>
			<Dropdown
			selectedKey={selectedLanguage ? selectedLanguage.key : undefined}
			label="言語"
			options={languageList}
			defaultSelectedKey={props.monacoProps.language}
			styles={languageListStyle}
			onChange={onLanguageChange}/>
		</>
  )
}

export default Settings