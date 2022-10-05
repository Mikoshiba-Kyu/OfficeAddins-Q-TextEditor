import React, { useState } from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import TextArea from "./TextArea"
import Header from './Header';

/* global console, Excel, require  */
const App = () => {

  /*
  React.useEffect(() => {
    registerEventHandlers()
  },[])

  const [cellValue, setCellValue] = React.useState('')
  const [sheetName, setSheetName] = React.useState('')
  const [address, setAddres] = React.useState('')


  // EventHundler
  const registerEventHandlers = async () => {
    await Excel.run(async (context) => {
      const sheets = context.workbook.worksheets
      sheets.onSelectionChanged.add(onSelectionChange)
      await context.sync()
    })
  }

  const onSelectionChange = async (args: any) => {
    await Excel.run(async (context) => {

      const sheet = context.workbook.worksheets.getItem(args.worksheetId)
      sheet.load(['name'])
      await context.sync()
      setSheetName(sheet.name)

      const range = sheet.getRange(args.address)
      range.load(['formulas'])
      await context.sync()
      setAddres(args.address)

      setCellValue(range.formulas[0][0])
    })
  } 
  */

  const [themeName, setThemeName] = useState('light');

  const tglThemeName = () => {
    setThemeName(themeName === 'light' ? 'vs-dark' : 'light')
  }

  return (
    <>
      <Header theme={themeName} />
      <DefaultButton text="ChangeTheme" onClick={tglThemeName} allowDisabledFocus/>
      <TextArea theme={themeName}/>
    </>
  )
}

export default App