export default async function run(page){
  await page.setViewportSize({width:393,height:900})
  await page.goto('http://localhost:4182/community-story',{waitUntil:'networkidle'})
  await page.addStyleTag({content:`.reveal{opacity:1!important;transform:none!important}`})
  await page.waitForTimeout(500)
  const fills = await page.evaluate(()=>({
    fillImgs: document.querySelectorAll('.fill-img').length,
    remainingLabels: [...document.querySelectorAll('.ph-label')].map(e=>e.textContent.trim()),
    allLoaded: [...document.querySelectorAll('.fill-img')].every(i=>i.naturalWidth>0)
  }))
  await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(200)
  await page.screenshot({path:'_cs_top.png', clip:{x:0,y:0,width:393,height:900}})
  return fills
}
