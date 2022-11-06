// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'useTheme.ts'

// ---------------------- Import ----------------------
import { useState } from "react"
import { PartialTheme } from '@fluentui/react'

// ---------------------- Logic ----------------------
export const useTheme = () => {

  const [theme, setTheme] = useState<string>(Office.context.document.settings.get('theme') ? Office.context.document.settings.get('theme') : 'light')

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

  return {theme, setTheme, lightTheme, darkTheme}
}