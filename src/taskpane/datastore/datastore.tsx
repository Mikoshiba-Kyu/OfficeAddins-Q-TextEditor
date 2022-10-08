export const setConfig = (propertyName: string, propertyValue: string): void => {
    Office.context.document.settings.set(propertyName, propertyValue)
    console.log(`[dev] setConfig : set value [${propertyValue}] to [${propertyName}]`)
}

export const getConfig = (propertyName: string): string | null => {
    const result: string | null = Office.context.document.settings.get(propertyName)
    console.log(`[dev] getConfig : get value [${result}] as [${propertyName}]`)
    return result
}
