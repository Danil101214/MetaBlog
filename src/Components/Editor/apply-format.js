export const applyFormat = (type, selectedText) => {
    if(type === "bold") {
        return `<b>${selectedText}</b>`
    } else if(type === "italic") {
        return `<i>${selectedText}</i>`
    } else if(type === "underline") {
        return `<u>${selectedText}</u>`
    } else return selectedText = ''
}