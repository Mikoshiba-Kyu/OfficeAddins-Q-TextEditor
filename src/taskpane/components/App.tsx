// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'App.tsx'

// ---------------------- Import ----------------------
import * as React from 'react'
import { useEffect }  from 'react'

import { ThemeProvider } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'

import { useTheme } from '../hooks/useTheme'
import { useMonacoSettings } from '../hooks/useMonacoSettings'

import TextArea from './TextArea'
import Footer from './Footer'
import SidePanel from './sidePanel'

// ---------------------- Contents ----------------------
const App = () => {
  isLogging && console.log(`[Addins] [${moduleName}] Rendering.`)

  const { monacoSettings, changeMonacoSettings } = useMonacoSettings()
  const { theme, setTheme, lightTheme, darkTheme } = useTheme()

  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false)

  // useEffect
  useEffect(() => {

    // TODO エディタの内容保存のしくみ作成後、ここで読み出しを行う
    // const body = Office.context.document.settings.get('body') ? Office.context.document.settings.get('body') : ''
    // ...

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