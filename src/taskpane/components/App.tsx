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

// ComponentFiles
import TextArea from './TextArea'
import Footer from './Footer'

import { useMonacoSettings } from '../hooks/useMonacoSettings'
import SidePanel from './sidePanel'

// ---------------------- Contents ----------------------
const App = () => {
  isLogging && console.log(`[Addins] [${moduleName}] レンダリング`)

  const { monacoSettings, changeMonacoSettings } = useMonacoSettings()
  isLogging && console.log(`[Addins] [${moduleName}] ${JSON.stringify(monacoSettings)}`)
  
  const [theme, setTheme] = useState<string>('')

  // SidePane
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false)

  // useEffect
  useEffect(() => {

    // テーマ設定を復元
    const theme = Office.context.document.settings.get('theme') ? Office.context.document.settings.get('theme') : 'light'
    setTheme(theme)

  }, [])

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <TextArea 
        theme={theme}
        monacoSettings={monacoSettings}
      />
      <SidePanel
        theme={theme}
        setTheme={setTheme}
        monacoSettings={monacoSettings}
        changeMonacoSettings={changeMonacoSettings}
        isOpen={isOpen}
        dismissPanel={dismissPanel}
      />
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