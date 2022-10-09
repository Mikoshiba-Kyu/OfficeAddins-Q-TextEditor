// React
import * as React from 'react'
import { useEffect }  from 'react'
import { useState } from 'react'

// DataStore
import { setConfig, getConfig } from '../datastore/datastore'

// FluentUIComponents
import { Panel } from '@fluentui/react/lib/Panel'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button'

// FluentUIHooks
import { useBoolean } from '@fluentui/react-hooks'

// ComponentFiles
import TextArea from "./TextArea"
import Header from './Header'
import Footer from './Footer'
import Settings from './Settings'

/* global console, Excel, require  */
const App = () => {

  // Settings
  const [theme, setTheme] = useState(getConfig('theme') || 'vs-dark')
  const [fontSize, setFontSize] = useState(getConfig('fontSize') || 18)
  const [fontFamily, setFontFamily] = useState(getConfig('fontFamily') || 'メイリオ')
  const [language, setLanguage] = useState(getConfig('language') || 'javascript')

  const monacoOptions: MonacoOptions = {
    fontSize,
    fontFamily
  }

  const monacoProps: MonacoProps = {
    defaultValue: '// Default Value.',
    language,
    theme,
    options: monacoOptions
  }

  useEffect(() => {

    // Settingsを取得する


    //
    console.log(`[dev] hello ${theme} ${fontSize} ${fontFamily}`)
  }, []);

    /*
  const [themeName, setThemeName] = useState('light');

  const tglThemeName = () => {
    setThemeName(themeName === 'light' ? 'vs-dark' : 'light')
    console.log(`[dev] setThemeName : ${themeName}`)
  */

  const buttonStyles = { root: { marginRight: 8 } };

  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  // This panel doesn't actually save anything; the buttons are just an example of what
  // someone might want to render in a panel footer.
  const onRenderFooterContent = React.useCallback(
    () => (
      <div>
        <DefaultButton onClick={dismissPanel}>Close</DefaultButton>
      </div>
    ),
    [dismissPanel],
  )

  return (
    <>
      <Header openPanel={openPanel} />
      <TextArea monacoProps={monacoProps} />
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        headerText="設定"
        closeButtonAriaLabel="Close"
        onRenderFooterContent={onRenderFooterContent}
        // Stretch panel content to fill the available height so the footer is positioned
        // at the bottom of the page
        isFooterAtBottom={true}
      >
        <Settings monacoProps={monacoProps} setLanguage={setLanguage}/>
      </Panel>
      <Footer monacoProps={monacoProps} />
    </>
  )
}

export default App

export type MonacoProps = {
  defaultValue?: string
  defaultLanguage?: string
  defaultPath?: string
  value?: string
  language?: string
  path?: string
  theme?: string
  line?: number
  options?: MonacoOptions
  overrideServices?: object
  saveViewState?: boolean
  keepCurrentModel?: boolean
  wrapperProps?: object
}

export type MonacoOptions = {
  fontSize : number | string
  fontFamily: string
}