const imageMapsForEva = () => {
  var myimages=new Array()
    
  function preloadimages(images){
    for (i in images) {
      myimages[i] = new Image()
      myimages[i].src = images[i]
    }
  }
  
  preloadimages([
    "/assets/image_map/map-for-web.gif",
    "/assets/image_map/map-for-web-uw.gif",
    "/assets/image_map/map-for-web-uc.gif",
    "/assets/image_map/map-for-web-ue.gif",
    "/assets/image_map/map-for-web-cw.gif",
    "/assets/image_map/map-for-web-cc.gif",
    "/assets/image_map/map-for-web-ce.gif"
  ])

  const mappable = document.querySelectorAll("img[usemap]")
  mappable.forEach((img) => {
    img.dataset.origSrc = img.src
    const map = document.querySelector(`map[name="${img.useMap.replace("#", "")}"]`)

    map.addEventListener("mouseout", () => {
      img.src = img.dataset.origSrc
    }, false)

    map.querySelectorAll("area").forEach((area) => {
      area.addEventListener("mouseover", () => {
        img.src = area.dataset.image
      }, false)
    })
  })
}


'loading' === document.readyState ? 
    document.addEventListener('DOMContentLoaded', imageMapsForEva, false) :
    imageMapsForEva()