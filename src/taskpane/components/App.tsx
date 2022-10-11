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
  const [language, setLanguage] = useState<string>('javascript')
  const [fontFamily, setFontFamily] = useState<string>('"Source Code Pro", "Sawarabi Gothic", monospace')
  const [fontSize, setFontSize] = useState<number>(18)
  const [tabSize, setTabSize] = useState<number>(4)


  useEffect(() => {
    //
    console.log(`[dev] hello ${theme} ${fontSize} ${fontFamily}`)
  }, [])

  // サイドパネル
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false)
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
        fontSize={fontSize}
        fontFamily={fontFamily}
        tabSize={tabSize}
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
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          fontSize={fontSize}
          setFontSize={setFontSize}
          tabSize={tabSize}
          setTabSize={setTabSize}
        />
      </Panel>
      <Footer 
        theme={theme}
        language={language}
        fontFamily={fontFamily}
        fontSize={fontSize}
        tabSize={tabSize}
        openPanel={openPanel}
      />
    </>
  )
}

export default App