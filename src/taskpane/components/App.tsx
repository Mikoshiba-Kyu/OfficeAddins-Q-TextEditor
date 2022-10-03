import * as React from "react"
import TextArea from "./TextArea"

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

  return (
    <div className="ms-welcome">
      <TextArea />
    </div>
  )
}

export default App