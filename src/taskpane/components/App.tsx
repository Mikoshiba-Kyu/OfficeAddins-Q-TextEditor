// React
import * as React from 'react'
import { useEffect, useState }  from 'react'

// DataStore
import { setConfig, getConfig } from '../datastore/datastore'

// FluentUIComponents
import { Panel } from '@fluentui/react/lib/Panel'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button'

// FluentUIHooks
import { useBoolean } from '@fluentui/react-hooks'

// ComponentFiles
import TextArea from './TextArea'
import Footer from './Footer'
import Settings from './Settings'

/* global console, Excel, require  */
const App = () => {

  // Settings
  const [theme, setTheme] = useState<string>('light')
  const [fontSize, setFontSize] = useState<number>(18)
  const [fontFamily, setFontFamily] = useState<string>('メイリオ')
  const [language, setLanguage] = useState<string>('javascript')

  useEffect(() => {
    //
    console.log(`[dev] hello ${theme} ${fontSize} ${fontFamily}`)
  }, []);

    /*
  const [themeName, setThemeName] = useState('light');

  const tglThemeName = () => {
    setThemeName(themeName === 'light' ? 'vs-dark' : 'light')
    console.log(`[dev] setThemeName : ${themeName}`)
  */

  // サイドパネル
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
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
      <TextArea 
        theme={theme}
        language={language}
        fontSize={fontSize as number}
        fontFamily={fontFamily}
      />
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        headerText="設定"
        closeButtonAriaLabel="Close"
        onRenderFooterContent={onRenderFooterContent}
        isFooterAtBottom={true}
      >
        <Settings 
          theme={theme}
          language={language}
          fontSize={fontSize}
          fontFamily={fontFamily}
          setTheme={setTheme}
          setLanguage={setLanguage}
          setFontSize={setFontSize}
        />
      </Panel>
      <Footer 
        theme={theme}
        language={language}
        fontSize={fontSize}
        fontFamily={fontFamily}
        openPanel={openPanel}
      />
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