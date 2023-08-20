const imageMapsForEva = () => {
  var myimages=new Array()
    
  function preloadimages(images){
    for (i in images) {
      myimages[i] = new Image()
      myimages[i].src = images[i]
    }
  }

  const mappable = document.querySelectorAll("img[usemap]")
  const imagesToPreload = []
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
      imagesToPreload.push(area.dataset.image)
    })
  })

  preloadimages([ ...new Set(imagesToPreload)])
}


'loading' === document.readyState ? 
    document.addEventListener('DOMContentLoaded', imageMapsForEva, false) :
    imageMapsForEva()