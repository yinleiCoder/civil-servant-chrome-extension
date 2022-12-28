const tabs = await chrome.tabs.query({})

const template = document.getElementById('li_template')
const elements = new Set()
for(const tab of tabs) {
    const element = template.content.firstElementChild.cloneNode(true)
    const pathname = new URL(tab.url).origin
    element.querySelector('.title').textContent = tab.title
    element.querySelector('.pathname').textContent = pathname
    element.querySelector('.favIconUrl').src = tab.favIconUrl??''
    element.querySelector('a').addEventListener('click', async ()=>{
        await chrome.tabs.update(tab.id, {active: true})
        await chrome.windows.update(tab.windowId, {focused: true})
    })
    elements.add(element)
}
document.querySelector('.tabManager > ul').append(...elements)
document.querySelector('.tabManager > p.count > span').textContent = [...elements].length


async function getCurrentTab() {
    let queryOptions = {active: true, lastFocusedWindow: true}
    let [tab] = await chrome.tabs.query(queryOptions)
    document.querySelector('.tabManager > p.current > span').textContent = tab.title
}

await getCurrentTab()
