// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'App.tsx'

// ---------------------- Import ----------------------

// React
import * as React from 'react'
import { useEffect, useState }  from 'react'

// DataStore
import { setConfig, getConfig } from '../datastore/datastore'

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

import { createXmlData, saveSettings } from '../excelapi'


import { useMonacoSettings } from '../hooks/useMonacoSettings'

// ---------------------- Contents ----------------------
const App = () => {
  isLogging && console.log(`[Addins] [${moduleName}] レンダリング`)

  const { monacoSettings, changeMonacoSettings } = useMonacoSettings()

  // Settings
  const [theme, setTheme] = useState<string>('light')

  useEffect(() => {
    //
    // console.log(`[dev] hello ${theme} ${fontSize} ${fontFamily}`)
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

  const createSettingsTest = () => {
    const sampleData = {
      Data1: 'purin',
      Data2: 'cake',
      Data3: 'ice',
      Data4: 'pan',
      Data5: 'coffie'
    }

    createXmlData('MasterData', sampleData)
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <DefaultButton onClick={createSettingsTest} >sample</DefaultButton>
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