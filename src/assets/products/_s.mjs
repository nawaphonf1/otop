export default async function run(page, ui){
  await page.setViewportSize({width:393,height:900})
  await page.goto('http://localhost:4178/products',{waitUntil:'networkidle'})
  await page.addStyleTag({content:`.reveal{opacity:1!important;transform:none!important}`})
  await page.waitForTimeout(600)
  const imgs = await page.evaluate(()=>[...document.querySelectorAll('.pgrid img')].slice(0,4).map(i=>({src:i.currentSrc.split('/').pop(), w:i.naturalWidth})))
  await page.screenshot({path:'_app_products.png', clip:{x:0,y:0,width:393,height:900}})
  // detail page p16
  await page.goto('http://localhost:4178/products/p16',{waitUntil:'networkidle'})
  await page.waitForTimeout(500)
  const thumbs = await page.evaluate(()=>document.querySelectorAll('.pd-thumb').length)
  await page.screenshot({path:'_app_detail.png', clip:{x:0,y:0,width:393,height:760}})
  return {gridImgs:imgs, detailThumbs:thumbs}
}
