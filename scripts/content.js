function readEssay() {
  const infos = document.querySelector(".infos")

  if (infos) {
    let spanElements = infos.getElementsByTagName("span")
    let wordCount = Array.prototype.reduce.call(
      spanElements,
      function (accumulator, spanElement) {
        return accumulator + spanElement.textContent.length
      },
      0
    )
    const readingTime = Math.round(wordCount / 200)
    let minutes = Math.floor(readingTime)
    let seconds = Math.round((readingTime - minutes) * 60)
    let readingTimeStr = `${minutes}分钟${seconds == 0 ? "" : seconds + "秒"}`
  
    const badge = document.createElement("p")
    badge.style.color = "gray"
    badge.textContent = `⏱️ 预计 ${readingTimeStr} 读完`
  
    const heading = document.querySelector(".detailContent")
    if(heading){
      heading.insertAdjacentElement("beforebegin", badge)
    }
  }
}

(function(){
  readEssay()
    // document.querySelector('xxx').addEventListener()    
})()