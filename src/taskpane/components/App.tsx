// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'App.tsx'

// ---------------------- Import ----------------------

// React
import * as React from 'react'
import { useEffect, useState }  from 'react'

// FluentUI
import { ThemeProvider, PartialTheme } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'

// FluentUIComponents
import { Panel } from '@fluentui/react/lib/Panel'
import { DefaultButton } from '@fluentui/react/lib/Button'

// ComponentFiles
import TextArea from './TextArea'
import Footer from './Footer'
import Settings from './Settings'

import { useMonacoSettings } from '../hooks/useMonacoSettings'

type MonacoSettings = {
	language?: string,
	fontFamily?: string,
	fontSize?: number,
	tabSize?: number
}

// ---------------------- Contents ----------------------
const App = () => {
  isLogging && console.log(`[Addins] [${moduleName}] レンダリング`)

  const { monacoSettings, changeMonacoSettings } = useMonacoSettings()

  
  const [theme, setTheme] = useState<string>('')

  // useEffect
  useEffect(() => {

    // テーマ設定を復元
    const theme = Office.context.document.settings.get('theme') ? Office.context.document.settings.get('theme') : 'light'
    setTheme(theme)

    // Monacoの設定を復元
    const language = Office.context.document.settings.get('language')
    const fontFamily = Office.context.document.settings.get('fontFamily')
    const fontSize = Office.context.document.settings.get('fontSize')
    const tabSize = Office.context.document.settings.get('tabSize')

    const presetSettings: MonacoSettings = {
      language: language ? language : 'plainText',
      fontFamily: fontFamily ? fontFamily : '"Source Code Pro", "Sawarabi Gothic", monospace',
      fontSize: fontSize ? fontSize : 18,
      tabSize: tabSize ? tabSize : 4
    }
    changeMonacoSettings(presetSettings)

  }, [])

  // サイドパネル
  const closePanel = () => {
    Office.context.document.settings.set('theme', theme)
    Office.context.document.settings.set('language', monacoSettings.language)
    Office.context.document.settings.set('fontFamily', monacoSettings.fontFamily)
    Office.context.document.settings.set('fontSize', monacoSettings.fontSize)
    Office.context.document.settings.set('tabSize', monacoSettings.tabSize)
    dismissPanel()
  }
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false)
  const onRenderFooterContent = React.useCallback(
    () => (
      <div>
        <DefaultButton onClick={closePanel}>Close</DefaultButton>
      </div>
    ),
    [dismissPanel],
  )

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <TextArea 
        theme={theme}
        monacoSettings={monacoSettings}
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
          monacoSettings={monacoSettings}
          changeMonacoSettings={changeMonacoSettings}
        />
      </Panel>
      <Footer 
        theme={theme}
        openPanel={openPanel}
        monacoSettings={monacoSettings}
      />
    </ThemeProvider>
  )
}
export default App

// ---------------------- Logic ----------------------
const lightTheme: PartialTheme = {
  semanticColors: {
    bodyBackground: '#FAFAFA',
    bodyText: '#111111',
  },
}

const darkTheme: PartialTheme = {
  semanticColors: {
    bodyBackground: '#111111',
    bodyText: '#FAFAFA',
  },
}