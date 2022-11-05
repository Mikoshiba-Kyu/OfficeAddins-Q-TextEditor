// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'useMonacoSettings.ts'

// ---------------------- Import ----------------------
import { useState } from "react"

// ---------------------- Types ----------------------
type MonacoSettings = {
  language?: string,
  fontFamily?: string,
  fontSize?: number,
  tabSize?: number
}

// ---------------------- Logic ----------------------
export const useMonacoSettings = () => {

  // ドキュメントに保存された設定値を復元し、
  // 設定値がなければデフォルト値を設定する
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

  const [monacoSettings, setMonacoSettings] = useState<MonacoSettings>(presetSettings)

  const changeMonacoSettings = (params: MonacoSettings) => {
    setMonacoSettings({...monacoSettings, ...params})
  }

  return {monacoSettings, changeMonacoSettings}
}