// React
import * as React from 'react'
import { useEffect }  from 'react'
import { useState } from 'react'

// DataStore
import { setConfig, getConfig } from '../datastore/datastore'

// FluentUIComponents
import { Panel } from '@fluentui/react/lib/Panel'
import { Settings } from './Settings'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button'

// FluentUIHooks
import { useBoolean } from '@fluentui/react-hooks'

// ComponentFiles
import TextArea from "./TextArea"
import Header from './Header'
import Footer from './Footer'

/* global console, Excel, require  */
const App = () => {

  // Settings
  const [themeName, setThemeName] = useState(getConfig('themeName') || 'vs-dark')
  const [fontSize, setFontSize] = useState(getConfig('fontSize') || 20)
  const [fontFamily, setFontFamily] = useState(getConfig('fontFamily') || 'MeiryoUI')
  const [language, setLanguage] = useState(getConfig('language') || 'JavaScript')


  const monacoOptions = {
    fontSize,
    fontFamily,
    "colorDecorators": true,
}

  useEffect(() => {

    // Settingsを取得する


    //
    console.log(`[dev] hello ${themeName} ${fontSize} ${fontFamily}`)
  }, []);

    /*
  const [themeName, setThemeName] = useState('light');

  const tglThemeName = () => {
    setThemeName(themeName === 'light' ? 'vs-dark' : 'light')
    console.log(`[dev] setThemeName : ${themeName}`)
  */

  const onSetConfig = (propertyName, propertyValue) => {
    setConfig(propertyName, propertyValue)
  }

  const onGetConfig = () => {
    setConfig('test', 'テスト値')
    getConfig('test')
  }

  const buttonStyles = { root: { marginRight: 8 } };

  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  // This panel doesn't actually save anything; the buttons are just an example of what
  // someone might want to render in a panel footer.
  const onRenderFooterContent = React.useCallback(
    () => (
      <div>
        <PrimaryButton onClick={dismissPanel} styles={buttonStyles}>
            Save
        </PrimaryButton>
        <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
      </div>
    ),
    [dismissPanel],
  )

  return (
    <>
      <Header openPanel={openPanel} />
      <TextArea theme={themeName} monacoOptions={monacoOptions}/>
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        headerText="Panel with footer at bottom"
        closeButtonAriaLabel="Close"
        onRenderFooterContent={onRenderFooterContent}
        // Stretch panel content to fill the available height so the footer is positioned
        // at the bottom of the page
        isFooterAtBottom={true}
      >
        <Settings />
      </Panel>
      <Footer language={language} setLanguage={setLanguage}/>
    </>
  )
}

export default App