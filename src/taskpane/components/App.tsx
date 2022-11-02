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

// ---------------------- Contents ----------------------
const App = () => {

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

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <TextArea 
        theme={theme}
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
        />
      </Panel>
      <Footer 
        theme={theme}
        openPanel={openPanel}
      />
    </ThemeProvider>
  )
}

export default App