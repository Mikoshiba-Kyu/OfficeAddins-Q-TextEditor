// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'excelapi.ts'

export const createXmlData = (dataName: string, params: object): void => {
  isLogging && console.log(`[Addins] [${moduleName}] [createXmlData] start.`)

  if (dataName === '') {
    isLogging && console.log(`[Addins] [${moduleName}] [createXmlData] dataName is blank.`)
    return
  }

  if (Object.keys(params).length === 0) {
    isLogging && console.log(`[Addins] [${moduleName}] [createXmlData] params is blank.`)
    return
  }

  // XML形式のデータを作成 <DataName><Param1>data1</Param1><Param2>data2</Param2><Param3>data3</Param3></DataName>
  let newData : string = ''
  Object.keys(params).forEach((key) => {
    newData = `${newData}<${key}>${params[key]}</${key}>`
  })
  newData = `<${dataName}>${newData}</${dataName}>`

  // Excelファイルに保存
  Excel.run(async (context) => {
    const originalXml = newData
    const customXmlPart = context.workbook.customXmlParts.add(originalXml)
    customXmlPart.load("id")
    const xmlBlob = customXmlPart.getXml()
    await context.sync()

    isLogging && console.log(`[Addins] [${moduleName}] [createXmlData] ${xmlBlob.value}`)

    const settings = context.workbook.settings
    settings.add(dataName, customXmlPart.id)
    await context.sync()

    isLogging && console.log(`[Addins] [${moduleName}] [createXmlData] end.`)
  })
}

export const loadSettings = (dataName: string): void => {
  isLogging && console.log(`[Addins] [${moduleName}] [loadSettings] start.`)

  if (dataName === '') {
    isLogging && console.log(`[Addins] [${moduleName}] [loadSettings] dataName is blank.`)
    return
  }

  Excel.run(async (context) => {
    const settings = context.workbook.settings
    const trgSetting = settings.getItemOrNullObject(dataName).load()
    await context.sync()

    if (trgSetting) {
      let customXmlPart = context.workbook.customXmlParts.getItem(trgSetting.value)
      const xmlBlob = customXmlPart.getXml()

      isLogging && console.log(`[Addins] [${moduleName}] [loadSettings] ${JSON.stringify(xmlBlob)}`)
    } else {
      isLogging && console.log(`[Addins] [${moduleName}] [loadSettings] end.`)
    }
  })
}

export const saveSettings = (): void => {
  isLogging && console.log(`[Addins] [${moduleName}] start`)

  Excel.run(async (context) => {

    try {
      const settings = context.workbook.settings;
      const xmlPartIDSetting = settings.getItemOrNullObject("AddinSettings").load("value");
      await context.sync()

      if (xmlPartIDSetting.value) {   
        const customXmlPart = context.workbook.customXmlParts.getItem(xmlPartIDSetting.value)
        
        // The setXml method does a whole-for-whole replacement 
        // of the entire XML.
        customXmlPart.setXml("<Settings xmlns='http://schemas.microsoft.com/office/appforoffice/1.1'><Theme>John</Theme><Language>Hitomi</Language><FontFamily>Meiryo</FontFamily><FontSize>8</FontSize><TabSize>2</TabSize></Settings>");
        const xmlBlob = customXmlPart.getXml()
        await context.sync()
  
        //const result = addLineBreaksToXML(xmlBlob.value)
        await context.sync()
  
        //isLogging && console.log(`[Addins] [${moduleName}] ${result}`)
      }
    } catch (error) {
      isLogging && console.log(`[Addins] [${moduleName}] error ${error}`)
    }

  })

  isLogging && console.log(`[Addins] [${moduleName}] end`)
}
