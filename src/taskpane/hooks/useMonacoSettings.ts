// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'useMonacoSettings.ts'

// ---------------------- Import ----------------------
import { useState } from "react"

// ---------------------- Logic ----------------------
export const useMonacoSettings = () => {
  const [language, setLanguage] = useState<string>('plainText')
  const [fontFamily, setFontFamily] = useState<string>('"Source Code Pro", "Sawarabi Gothic", monospace')
  const [fontSize, setFontSize] = useState<number>(18)
  const [tabSize, setTabSize] = useState<number>(4)

  return {language, setLanguage, fontFamily, setFontFamily, fontSize, setFontSize, tabSize, setTabSize}
}