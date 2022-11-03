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

  const [monacoSettings, setMonacoSettings] = useState<MonacoSettings>({
    language: 'plainText',
    fontFamily: '"Source Code Pro", "Sawarabi Gothic", monospace',
    fontSize: 18,
    tabSize: 4
  })

  const changeMonacoSettings = (params: MonacoSettings) => {
    setMonacoSettings({...monacoSettings, ...params})
  }

  return {monacoSettings, changeMonacoSettings}
}